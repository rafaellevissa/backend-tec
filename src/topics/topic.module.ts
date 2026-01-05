import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Topic } from './topic.model';

@Module({
  imports: [SequelizeModule.forFeature([Topic])],
  exports: [SequelizeModule]
})
export class TopicModule {}
