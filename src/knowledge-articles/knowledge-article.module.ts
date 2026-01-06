import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { KnowledgeArticle } from './knowledge-article.model';
import { KnowledgeArticlesController } from './knowledge-article.controller';
import { KnowledgeArticlesService } from './knowledge-article.service';
import { DuplicateArticleListener } from './listeners/duplicate-article.listener';
import { Alias } from '../aliases/alias.model';
import { Tenant } from 'src/tenants/tenant.model';

@Module({
  imports: [SequelizeModule.forFeature([KnowledgeArticle, Alias, Tenant])],
  controllers: [KnowledgeArticlesController],
  providers: [KnowledgeArticlesService, DuplicateArticleListener],
  exports: [SequelizeModule],
})
export class KnowledgeArticleModule {}
