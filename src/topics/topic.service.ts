import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Topic } from './topic.model';

@Injectable()
export class TopicsService {
  constructor(
    @InjectModel(Topic)
    private readonly topicModel: typeof Topic,
  ) {}

  public async create(name: string): Promise<Topic> {
    return this.topicModel.create({ name });
  }

  public async findAll(): Promise<Topic[]> {
    return this.topicModel.findAll();
  }

  public async findById(id: number): Promise<Topic> {
    const topic = await this.topicModel.findByPk(id);
    if (!topic) {
      throw new NotFoundException('Topic not found');
    }
    return topic;
  }

  public async update(id: number, name: string): Promise<Topic> {
    const topic = await this.findById(id);

    const count = await topic.$count('knowledgeArticles');
    if (count > 0) {
      throw new ConflictException(
        'This topic is already associated with knowledge articles and cannot be updated',
      );
    }

    topic.name = name;
    return topic.save();
  }

  public async delete(id: number): Promise<void> {
    const topic = await this.findById(id);

    const count = await topic.$count('knowledgeArticles');

    if (count > 0) {
      throw new ConflictException(
        'This topic is already associated with knowledge articles and cannot be deleted',
      );
    }

    await topic.destroy();
  }
}
