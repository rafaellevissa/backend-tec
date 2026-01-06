import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { KnowledgeArticle } from '../knowledge-articles/knowledge-article.model';
import { Topic } from '../topics/topic.model';

@Table({
  tableName: 'knowledge_article_topics',
  timestamps: false,
})
export class KnowledgeArticleTopic extends Model<KnowledgeArticleTopic> {
  @ForeignKey(() => KnowledgeArticle)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  knowledgeArticleId: number;

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  topicId: number;
}
