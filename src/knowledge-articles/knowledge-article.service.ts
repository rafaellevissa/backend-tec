import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { KnowledgeArticle } from './knowledge-article.model';
import { Alias } from '../aliases/alias.model';
import { Topic } from '../topics/topic.model';
import { ListKnowledgeArticlesDto } from './dto/list-knowledge-articles.dto';
import { CreateKnowledgeArticleDto } from './dto/create-knowledge-article.dto';
import { UpdateKnowledgeArticleDto } from './dto/update-knowledge-article.dto';

@Injectable()
export class KnowledgeArticlesService {

  constructor(
    @InjectModel(KnowledgeArticle)
    private readonly knowledgeArticleModel: typeof KnowledgeArticle,

    @InjectModel(Alias)
    private readonly aliasModel: typeof Alias,

    private readonly sequelize: Sequelize,
  ) {}

  async findAll(filters: ListKnowledgeArticlesDto) {
    const { search, tenantId, publishedYear } = filters;

    return this.knowledgeArticleModel.findAll({
      where: {
        ...(tenantId && { tenantId }),
        ...(publishedYear && { publishedYear }),
      },

      include: [
        {
          model: Alias,
          required: false,
          ...(search && {
            where: {
              name: {
                [Op.like]: `%${search}%`,
              },
            },
          }),
        },
        {
          model: Topic,
          through: { attributes: [] },
        },
      ],

      ...(search && {
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
          ],
        },
      }),
    });
  }

  async create(dto: CreateKnowledgeArticleDto) {
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

      return article;
    });
  }

  async update(
    id: number,
    dto: UpdateKnowledgeArticleDto,
  ) {
    return this.sequelize.transaction(async (transaction) => {
      const article = await this.knowledgeArticleModel.findByPk(id, {
        transaction,
      });

      if (!article) {
        throw new NotFoundException(
          'Knowledge article not found',
        );
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
