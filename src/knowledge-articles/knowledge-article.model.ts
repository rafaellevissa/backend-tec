import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import {
  BelongsToManySetAssociationsMixin,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { Topic } from 'src/topics/topic.model';
import { Tenant } from 'src/tenants/tenant.model';
import { KnowledgeArticleTopic } from 'src/knowledge-article-topics/knowledge-article-topic.model';
import { Alias } from 'src/aliases/alias.model';

@Table({ tableName: 'knowledge_articles' })
export class KnowledgeArticle extends Model<
  InferAttributes<KnowledgeArticle>,
  InferCreationAttributes<KnowledgeArticle>
> {
  declare id: CreationOptional<number>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare body: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare publishedYear: number;

  @HasMany(() => Alias)
  declare aliases?: Alias[];

  @ForeignKey(() => Tenant)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare tenantId: number;

  @BelongsTo(() => Tenant)
  declare tenant?: Tenant;

  @BelongsToMany(() => Topic, () => KnowledgeArticleTopic)
  declare topics?: Topic[];

  declare setTopics: BelongsToManySetAssociationsMixin<Topic, number>;
}
