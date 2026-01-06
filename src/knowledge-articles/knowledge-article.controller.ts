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
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { KnowledgeArticlesService } from './knowledge-article.service';
import { ListKnowledgeArticlesDto } from './dto/list-knowledge-articles.dto';
import { UpdateKnowledgeArticleDto } from './dto/update-knowledge-article.dto';
import { CreateKnowledgeArticleDto } from './dto/create-knowledge-article.dto';

@ApiTags('knowledge-articles')
@Controller('knowledge-articles')
export class KnowledgeArticlesController {
  constructor(
    private readonly knowledgeArticlesService: KnowledgeArticlesService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'List knowledge articles' })
  @ApiResponse({
    status: 200,
    description: 'List of knowledge articles',
  })
  public async list(@Query() query: ListKnowledgeArticlesDto) {
    return this.knowledgeArticlesService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Create a knowledge article' })
  @ApiResponse({
    status: 201,
    description: 'Article created successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Tenant not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Duplicate article detected',
  })
  public async create(@Body() dto: CreateKnowledgeArticleDto) {
    return this.knowledgeArticlesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a knowledge article' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Article updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Article not found',
  })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateKnowledgeArticleDto,
  ) {
    return this.knowledgeArticlesService.update(id, dto);
  }
}
