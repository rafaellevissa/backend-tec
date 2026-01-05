import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { KnowledgeArticle } from './knowledge-article.model';
import { KnowledgeArticlesController } from './knowledge-article.controller';
import { KnowledgeArticlesService } from './knowledge-article.service';

@Module({
  imports: [SequelizeModule.forFeature([KnowledgeArticle])],
  controllers: [KnowledgeArticlesController],
  providers: [KnowledgeArticlesService],
  exports: [SequelizeModule]
})
export class KnowledgeArticleModule {}
