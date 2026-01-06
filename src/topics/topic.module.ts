import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Topic } from './topic.model';
import { TopicsController } from './topic.controller';
import { TopicsService } from './topic.service';

@Module({
  imports: [SequelizeModule.forFeature([Topic])],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [SequelizeModule],
})
export class TopicModule {}
