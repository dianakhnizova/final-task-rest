import type {
  FetchBuilderParams,
  RequestData,
  RequestDetails,
  ResponseMetrics,
  ServerFetchResponse,
} from '@/types/requestData.ts';
import { type ActionFunctionArgs } from 'react-router';
import { HttpMethods } from '@/sources/enums';
import { REQUEST_DATA_NAME } from '@/sources/constants/constants';
import { getFinalUrlParams } from '@/utils/fetch/getFinalUrlParams';
import { mergedDataResponse } from '@/utils/fetch/mergeDataResponse';
import { interpolate } from '@/utils/interpolate.ts';

export const action = async ({
  request,
}: ActionFunctionArgs): Promise<ServerFetchResponse> => {
  const actionRequestHeaders = request.headers;

  const formData = await request.formData();
  const jsonDataString = formData.get(REQUEST_DATA_NAME);

  if (!jsonDataString || typeof jsonDataString != 'string') {
    console.log(
      `'${REQUEST_DATA_NAME}' not found in FormData or is not a string.`
    );

    return {
      ok: false,
      received: null,
      status: null,
      error: 'Request data not found',
      headers: actionRequestHeaders,
      requestDetails: {
        timestamp: new Date(),
      },
    };
  }
  const requestData = JSON.parse(jsonDataString) as RequestData;
  const { clientState, globalVariables } = requestData;
  const variablesMap = new Map(
    globalVariables.map(item => [item.key, item.value])
  );

  const {
    body: rawBody,
    method,
    headers: rawHeaders,
    protocol,
    url: rawUrl,
  } = clientState;

  const url = interpolate(`${protocol}${rawUrl}`, variablesMap);
  const body =
    method !== HttpMethods.GET &&
    method !== HttpMethods.HEAD &&
    method !== HttpMethods.OPTIONS &&
    method !== HttpMethods.DELETE
      ? interpolate(rawBody, variablesMap)
      : null;
  const headers = rawHeaders.map((header, index) => ({
    id: index,
    key: interpolate(header.key, variablesMap),
    value: interpolate(header.value, variablesMap),
  }));
  const finalUrl = getFinalUrlParams(body, method, headers, url);

  const fetchWithMetrics = buildFetchWithMetrics({
    body,
    method,
    headers,
    url,
  });

  const requestDetails: RequestDetails = {
    timestamp: new Date(),
    method,
    url,
  };

  try {
    const { response: res, metrics } = await fetchWithMetrics();

    const responseText = await res.text();
    const mergedData = mergedDataResponse(responseText, body);

    return {
      ok: true,
      received: mergedData,
      status: res.status,
      headers: actionRequestHeaders,
      finalUrl,
      responseMetrics: metrics,
      requestDetails,
    };
  } catch (error) {
    const errorMessage = (error as Error).message;

    return {
      ok: false,
      received: null,
      status: null,
      error: errorMessage,
      headers: actionRequestHeaders,
      requestDetails,
    };
  }
};

const buildFetchWithMetrics = (fetchParams: FetchBuilderParams) => {
  const { body, method, headers, url } = fetchParams;

  const headersObject = Object.fromEntries(
    headers.map((header: { key: string; value: string }) => [
      header.key,
      header.value,
    ])
  );

  return async () => {
    const startTime = performance.now();

    const response = await fetch(url, {
      method,
      body: body,
      headers: headersObject,
    });

    const endTime = performance.now();

    const latencyMs = Math.trunc(endTime - startTime);

    const requestSizeBytes = body ? new Blob([body]).size : 0;

    let responseSizeBytes;

    if (response.headers.get('Content-Length') !== null) {
      responseSizeBytes = parseInt(
        response.headers.get('Content-Length') ?? '0'
      );
    } else {
      const responseClone = response.clone();
      const responseBuffer = await responseClone.blob();
      responseSizeBytes = responseBuffer.size;
    }

    return {
      response,
      metrics: {
        latencyMs,
        requestSize: requestSizeBytes,
        responseSize: responseSizeBytes,
      } as ResponseMetrics,
    };
  };
};
