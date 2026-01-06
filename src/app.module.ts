import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TenantModule } from './tenants/tenant.module';
import { KnowledgeArticleModule } from './knowledge-articles/knowledge-article.module';
import { AliasModule } from './aliases/alias.module';
import { TopicModule } from './topics/topic.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnowledgeArticleTopicModule } from './knowledge-article-topics/knowledge-article-topic.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    TenantModule,
    TopicModule,
    KnowledgeArticleModule,
    AliasModule,
    KnowledgeArticleTopicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
