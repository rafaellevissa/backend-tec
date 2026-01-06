export class DuplicateArticleWarningEvent {
  constructor(
    public readonly tenantId: number,
    public readonly newArticleId: number,
    public readonly newTitle: string,
    public readonly matchedArticleIds: number[],
  ) {}
}
