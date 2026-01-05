import { type NonAttribute } from "sequelize";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { KnowledgeArticle } from "src/knowledge-articles/knowledge-article.model";

@Table({ tableName: "tenants" })
export class Tenant extends Model<Tenant> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public name: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'en-US'
    })
    public primaryLocale: string

    @HasMany(() => KnowledgeArticle)
    public readonly knowledgeArticles?: NonAttribute<KnowledgeArticle[]>
}
