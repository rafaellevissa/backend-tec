import {
  Column,
  DataType,
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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare tenantId: number;

  declare setTopics: BelongsToManySetAssociationsMixin<Topic, number>;
}
