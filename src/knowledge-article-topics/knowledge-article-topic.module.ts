import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { KnowledgeArticleTopic } from './knowledge-article-topic.model';

@Module({
  imports: [SequelizeModule.forFeature([KnowledgeArticleTopic])],
  exports: [SequelizeModule],
})
export class KnowledgeArticleTopicModule {}
