import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tenant } from './tenant.model';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenant.service';

@Module({
  imports: [SequelizeModule.forFeature([Tenant])],
  controllers: [TenantsController],
  providers: [TenantsService],
  exports: [SequelizeModule],
})
export class TenantModule {}
