import { Injectable, Logger } from "@nestjs/common";
import { DuplicateArticleWarningEvent } from "../events/duplicate-article-warning.event";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class DuplicateArticleListener {
  private readonly logger = new Logger(DuplicateArticleListener.name);

  @OnEvent('duplicate_article_warning')
  public handleDuplicate(event: DuplicateArticleWarningEvent) {
    this.logger.warn(
      `Duplicate article detected for tenant ${event.tenantId}`,
      {
        newArticleId: event.newArticleId,
        matchedArticleIds: event.matchedArticleIds,
      }
    )
  }
}