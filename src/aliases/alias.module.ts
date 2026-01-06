import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Alias } from './alias.model';

@Module({
  imports: [SequelizeModule.forFeature([Alias])],
  exports: [SequelizeModule],
})
export class AliasModule {}
