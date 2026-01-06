import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { KnowledgeArticlesService } from './knowledge-article.service';
import { ListKnowledgeArticlesDto } from './dto/list-knowledge-articles.dto';
import { UpdateKnowledgeArticleDto } from './dto/update-knowledge-article.dto';
import { CreateKnowledgeArticleDto } from './dto/create-knowledge-article.dto';

@Controller('knowledge-articles')
export class KnowledgeArticlesController {
  constructor(
    private readonly knowledgeArticlesService: KnowledgeArticlesService,
  ) {}

  @Get()
  public async list(@Query() query: ListKnowledgeArticlesDto) {
    return this.knowledgeArticlesService.findAll(query);
  }

  @Post()
  public async create(@Body() dto: CreateKnowledgeArticleDto) {
    return this.knowledgeArticlesService.create(dto);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateKnowledgeArticleDto,
  ) {
    return this.knowledgeArticlesService.update(id, dto);
  }
}
