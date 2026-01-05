import { PartialType } from '@nestjs/mapped-types';
import { CreateKnowledgeArticleDto } from './create-knowledge-article.dto';

export class UpdateKnowledgeArticleDto extends PartialType(
  CreateKnowledgeArticleDto,
) {}
