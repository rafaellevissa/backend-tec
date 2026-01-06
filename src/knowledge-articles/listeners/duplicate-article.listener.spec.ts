import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from '@nestjs/common';
import { DuplicateArticleListener } from './duplicate-article.listener';
import { DuplicateArticleWarningEvent } from '../events/duplicate-article-warning.event';

describe('DuplicateArticleListener', () => {
  let listener: DuplicateArticleListener;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DuplicateArticleListener],
    }).compile();

    listener = module.get(DuplicateArticleListener);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log a warning when a duplicate article event is received', () => {
    const event: DuplicateArticleWarningEvent = {
      tenantId: 1,
      newTitle: "test",
      newArticleId: 10,
      matchedArticleIds: [2, 3, 4],
    };

    const loggerSpy = jest
      .spyOn(Logger.prototype, 'warn')
      .mockImplementation(() => undefined);

    listener.handleDuplicate(event);

    expect(loggerSpy).toHaveBeenCalledTimes(1);
    expect(loggerSpy).toHaveBeenCalledWith(
      'Duplicate article detected for tenant 1',
      {
        newArticleId: 10,
        matchedArticleIds: [2, 3, 4],
      },
    );
  });
});
