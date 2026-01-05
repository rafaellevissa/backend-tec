import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  type NonAttribute,
} from 'sequelize';
import { KnowledgeArticle } from '../knowledge-articles/knowledge-article.model';

@Table({ tableName: 'aliases' })
export class Alias extends Model<
  InferAttributes<Alias>,
  InferCreationAttributes<Alias>
> {
  declare id: CreationOptional<number>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ForeignKey(() => KnowledgeArticle)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare knowledgeArticleId: number;

  @BelongsTo(() => KnowledgeArticle)
  declare knowledgeArticle?: NonAttribute<KnowledgeArticle>;
}
