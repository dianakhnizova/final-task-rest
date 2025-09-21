import type { TFunction } from 'i18next';
import { isRouteErrorResponse } from 'react-router';
import { type Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorCode } from '@/sources/enums';
import { getErrorData } from '../getErrorData';

vi.mock('react-router', () => ({
  isRouteErrorResponse: vi.fn(),
}));

const mockedIsRouteErrorResponse = isRouteErrorResponse as unknown as Mock;

describe('getErrorData', () => {
  const t = ((key: string) => key) as unknown as TFunction;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns notFound when status is 404', () => {
    mockedIsRouteErrorResponse.mockReturnValue(true);

    const error = { status: ErrorCode.NOT_FOUND, statusText: 'Not Found' };
    const result = getErrorData(error, t);

    expect(result).toEqual({
      message: t('errorBoundary.notFound'),
      details: t('errorBoundary.notFound'),
    });
  });

  it('returns generic error for other statuses', () => {
    mockedIsRouteErrorResponse.mockReturnValue(true);

    const error = { status: 500, statusText: 'Internal Server Error' };
    const result = getErrorData(error, t);

    expect(result).toEqual({
      message: t('errorBoundary.error'),
      details: 'Internal Server Error',
    });
  });

  it('returns oops for non-route errors', () => {
    mockedIsRouteErrorResponse.mockReturnValue(false);

    const error = new Error('Something went wrong');
    const result = getErrorData(error, t);

    expect(result).toEqual({
      message: t('errorBoundary.oops'),
      details: 'Something went wrong',
      stack: error.stack,
    });
  });
});
