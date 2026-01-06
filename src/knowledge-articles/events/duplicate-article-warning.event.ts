export class DuplicateArticleWarningEvent {
  constructor(
    public readonly tenantId: string,
    public readonly newArticleId: number,
    public readonly newTitle: string,
    public readonly matchedArticleIds: number[],
  ) {}
}
