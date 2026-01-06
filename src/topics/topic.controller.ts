import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger';
import { TopicsService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@ApiTags('topics')
@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a topic' })
  @ApiResponse({ status: 201, description: 'Topic created successfully' })
  public async create(@Body() dto: CreateTopicDto) {
    return this.topicsService.create(dto.name);
  }

  @Get()
  @ApiOperation({ summary: 'List all topics' })
  public async findAll() {
    return this.topicsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get topic by id' })
  @ApiParam({ name: 'id', type: Number })
  public async findById(@Param('id', ParseIntPipe) id: number) {
    return this.topicsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a topic' })
  @ApiParam({ name: 'id', type: Number })
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTopicDto,
  ) {
    return this.topicsService.update(id, dto.name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a topic' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Topic deleted successfully' })
  public async delete(@Param('id', ParseIntPipe) id: number) {
    await this.topicsService.delete(id);
    return { message: 'Topic deleted successfully' };
  }
}
