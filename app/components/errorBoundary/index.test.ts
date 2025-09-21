import { isRouteErrorResponse } from 'react-router';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorCode } from '@/sources/enums';
import { messages } from '@/sources/messages';
import { getErrorData } from './getErrorData';

vi.mock('react-router', () => ({
  isRouteErrorResponse: vi.fn(),
}));

const mockedIsRouteErrorResponse = isRouteErrorResponse as unknown as Mock;

describe('getErrorData', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns notFound when status is 404', () => {
    mockedIsRouteErrorResponse.mockReturnValue(true);

    const error = { status: ErrorCode.NOT_FOUND, statusText: 'Not Found' };
    const result = getErrorData(error);

    expect(result).toEqual({
      message: messages.errorBoundary.notFound,
      details: messages.errorBoundary.notFound,
    });
  });

  it('returns generic error for other statuses', () => {
    mockedIsRouteErrorResponse.mockReturnValue(true);

    const error = { status: 500, statusText: 'Internal Server Error' };
    const result = getErrorData(error);

    expect(result).toEqual({
      message: messages.errorBoundary.error,
      details: 'Internal Server Error',
    });
  });
});
