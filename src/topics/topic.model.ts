import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { KnowledgeArticleTopic } from "src/knowledge-article-topics/knowledge-article-topic.model";
import { KnowledgeArticle } from "src/knowledge-articles/knowledge-article.model";

@Table({ tableName: "topics" })
export class Topic extends Model<Topic> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public name: string

    @BelongsToMany(() => KnowledgeArticle, () => KnowledgeArticleTopic)
    knowledgeArticles: KnowledgeArticle[];
}