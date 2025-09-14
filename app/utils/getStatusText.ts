import { ErrorCode, HttpStatusText } from '@/sources/enums';

export function getStatusText(status: number | null): string {
  switch (status) {
    case ErrorCode.OK:
      return HttpStatusText.OK;
    case ErrorCode.CREATED:
      return HttpStatusText.CREATED;
    case ErrorCode.NO_CONTENT:
      return HttpStatusText.NO_CONTENT;

    case ErrorCode.BAD_REQUEST:
      return HttpStatusText.BAD_REQUEST;
    case ErrorCode.UNAUTHORIZED:
      return HttpStatusText.UNAUTHORIZED;
    case ErrorCode.FORBIDDEN:
      return HttpStatusText.FORBIDDEN;
    case ErrorCode.NOT_FOUND:
      return HttpStatusText.NOT_FOUND;

    case ErrorCode.INTERNAL_SERVER_ERROR:
      return HttpStatusText.INTERNAL_SERVER_ERROR;
    case ErrorCode.BAD_GATEWAY:
      return HttpStatusText.BAD_GATEWAY;
    case ErrorCode.SERVICE_UNAVAILABLE:
      return HttpStatusText.SERVICE_UNAVAILABLE;

    default:
      return HttpStatusText.UNKNOWN;
  }
}
