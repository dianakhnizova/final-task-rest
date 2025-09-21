import { describe, expect, it } from 'vitest';
import { ErrorCode, HttpStatusText } from '@/sources/enums';
import { getStatusText } from '../getStatusText';

describe('getStatusText', () => {
  it('returns correct text for known status codes', () => {
    expect(getStatusText(ErrorCode.OK)).toBe(HttpStatusText.OK);
    expect(getStatusText(ErrorCode.CREATED)).toBe(HttpStatusText.CREATED);
    expect(getStatusText(ErrorCode.NO_CONTENT)).toBe(HttpStatusText.NO_CONTENT);

    expect(getStatusText(ErrorCode.BAD_REQUEST)).toBe(
      HttpStatusText.BAD_REQUEST
    );
    expect(getStatusText(ErrorCode.UNAUTHORIZED)).toBe(
      HttpStatusText.UNAUTHORIZED
    );
    expect(getStatusText(ErrorCode.FORBIDDEN)).toBe(HttpStatusText.FORBIDDEN);
    expect(getStatusText(ErrorCode.NOT_FOUND)).toBe(HttpStatusText.NOT_FOUND);

    expect(getStatusText(ErrorCode.INTERNAL_SERVER_ERROR)).toBe(
      HttpStatusText.INTERNAL_SERVER_ERROR
    );
    expect(getStatusText(ErrorCode.BAD_GATEWAY)).toBe(
      HttpStatusText.BAD_GATEWAY
    );
    expect(getStatusText(ErrorCode.SERVICE_UNAVAILABLE)).toBe(
      HttpStatusText.SERVICE_UNAVAILABLE
    );
  });

  it('returns UNKNOWN for unknown or null status', () => {
    expect(getStatusText(999)).toBe(HttpStatusText.UNKNOWN);
    expect(getStatusText(null)).toBe(HttpStatusText.UNKNOWN);
  });
});
