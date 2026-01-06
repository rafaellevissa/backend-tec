import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Transaction, WhereOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { KnowledgeArticle } from './knowledge-article.model';
import { Alias } from '../aliases/alias.model';
import { Topic } from '../topics/topic.model';
import { ListKnowledgeArticlesDto } from './dto/list-knowledge-articles.dto';
import { CreateKnowledgeArticleDto } from './dto/create-knowledge-article.dto';
import { UpdateKnowledgeArticleDto } from './dto/update-knowledge-article.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DuplicateArticleWarningEvent } from './events/duplicate-article-warning.event';
import { Tenant } from 'src/tenants/tenant.model';

@Injectable()
export class KnowledgeArticlesService {
  constructor(
    @InjectModel(KnowledgeArticle)
    private readonly knowledgeArticleModel: typeof KnowledgeArticle,

    @InjectModel(Alias)
    private readonly aliasModel: typeof Alias,

    @InjectModel(Tenant)
    private readonly tenantModel: typeof Tenant,

    private readonly sequelize: Sequelize,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async findAll(filters: ListKnowledgeArticlesDto) {
    const { search, tenantId, publishedYear } = filters;

    const where: WhereOptions<KnowledgeArticle> = {
      ...(tenantId && { tenantId }),
      ...(publishedYear && { publishedYear }),
    };

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { '$aliases.name$': { [Op.like]: `%${search}%` } },
      ];
    }

    const { rows } = await this.knowledgeArticleModel.findAndCountAll({
      where,
      include: [
        {
          model: Alias,
          required: false,
        },
        {
          model: Topic,
          through: { attributes: [] },
          required: false,
        },
      ],
      distinct: true,
    });

    return rows;
  }

  public async create(dto: CreateKnowledgeArticleDto) {
    const tenantExists = await this.tenantModel.findByPk(dto.tenantId);

    if (!tenantExists) {
      throw new NotFoundException(`Tenant with id ${dto.tenantId} not found`);
    }

    return this.sequelize.transaction(async (transaction) => {
      const article = await this.knowledgeArticleModel.create(
        {
          title: dto.title,
          body: dto.body,
          publishedYear: dto.publishedYear,
          tenantId: dto.tenantId,
        },
        { transaction },
      );

      if (dto.aliases?.length) {
        await this.aliasModel.bulkCreate(
          dto.aliases.map((a) => ({
            name: a.name,
            knowledgeArticleId: article.id,
          })),
          { transaction },
        );
      }

      if (dto.topicIds?.length) {
        await article.setTopics(dto.topicIds, { transaction });
      }

      const duplicates = await this.detectDuplicate(article, transaction);
      this.emitDuplicate(article, duplicates);

      return article;
    });
  }

  private emitDuplicate(
    article: KnowledgeArticle,
    duplicates: KnowledgeArticle[],
  ) {
    if (!duplicates.length) return;

    this.eventEmitter.emit(
      'duplicate_article_warning',
      new DuplicateArticleWarningEvent(
        article.tenantId,
        article.id,
        article.title,
        duplicates.map((d) => d.id),
      ),
    );
  }

  private async detectDuplicate(
    article: KnowledgeArticle,
    transaction: Transaction,
  ): Promise<KnowledgeArticle[]> {
    return this.knowledgeArticleModel.findAll({
      where: {
        tenantId: article.tenantId,
        id: { [Op.ne]: article.id },
        [Op.or]: [{ title: article.title }],
      },
      include: [
        {
          model: this.aliasModel,
          required: false,
          where: { name: article.title },
        },
      ],
      transaction,
    });
  }

  public async update(id: number, dto: UpdateKnowledgeArticleDto) {
    return this.sequelize.transaction(async (transaction) => {
      const article = await this.knowledgeArticleModel.findByPk(id, {
        transaction,
      });

      if (!article) {
        throw new NotFoundException('Knowledge article not found');
      }

      await article.update(
        {
          title: dto.title,
          body: dto.body,
          publishedYear: dto.publishedYear,
        },
        { transaction },
      );

      if (dto.aliases) {
        await this.aliasModel.destroy({
          where: { knowledgeArticleId: article.id },
          transaction,
        });

        await this.aliasModel.bulkCreate(
          dto.aliases.map((a) => ({
            name: a.name,
            knowledgeArticleId: article.id,
          })),
          { transaction },
        );
      }

      if (dto.topicIds) {
        await article.setTopics(dto.topicIds, {
          transaction,
        });
      }

      return article;
    });
  }
}
