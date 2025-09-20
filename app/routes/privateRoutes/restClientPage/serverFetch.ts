import { REQUEST_DATA_NAME } from '@/routes/privateRoutes/restClientPage/components/requestSender/RequestSender.constants.ts';
import { addHistoryForCurrentUser } from '@/services/historyService.ts';
import { getServerSupabaseClient } from '@/supabaseClient.ts';
import type { RequestData } from '@/types/requestData.ts';
import type { Database } from '@/types/supabase.ts';

import { type ActionFunctionArgs } from 'react-router';

import { HttpMethods } from '@/sources/enums';

import { getFinalUrlParams } from '@/utils/fetch/getFinalUrlParams';
import { mergedDataResponse } from '@/utils/fetch/mergeDataResponse';

export const action = async ({ request }: ActionFunctionArgs) => {
  const { client: supabase, headers: actionRequestHeaders } =
    getServerSupabaseClient(request);

  const formData = await request.formData();
  const jsonDataString = formData.get(REQUEST_DATA_NAME);

  if (!jsonDataString || typeof jsonDataString != 'string') {
    console.error(
      `'${REQUEST_DATA_NAME}' not found in FormData or is not a string.`
    );

    return {
      ok: false,
      received: null,
      status: null,
      error: 'Request data not found',
      headers: actionRequestHeaders,
    };
  }
  const requestData = JSON.parse(jsonDataString) as RequestData;

  const {
    body,
    method,
    headers,
    protocol,
    url: rawUrl,
  } = requestData.clientState;

  const url = `${protocol}${rawUrl}`;

  const finalUrl = getFinalUrlParams(body, method, headers, url);

  const fetchWithMetrics = buildFetchWithMetrics(requestData);

  const history: Database['public']['Tables']['history']['Insert'] = {
    clientState: JSON.stringify(requestData.clientState),
    method: method,
    url: url,
    timestamp: new Date().toISOString(),
    user_id: '',
  };

  try {
    const { response: res, metrics } = await fetchWithMetrics();

    history.status = res.status;
    history.latency_ms = metrics.latencyMs;
    history.requestSize = metrics.requestSize;
    history.responseSize = metrics.responseSize;

    const responseText = await res.text();
    const mergedData = mergedDataResponse(responseText, body);

    return {
      ok: true,
      received: mergedData,
      status: res.status,
      headers: actionRequestHeaders,
      finalUrl,
    };
  } catch (error) {
    const errorMessage = (error as Error).message;

    history.error = errorMessage;

    return {
      ok: false,
      received: null,
      status: null,
      error: errorMessage,
      headers: actionRequestHeaders,
    };
  } finally {
    await addHistoryForCurrentUser(supabase, history);
  }
};

const buildFetchWithMetrics = (requestData: RequestData) => {
  const {
    body,
    method,
    headers,
    protocol,
    url: rawUrl,
  } = requestData.clientState;

  const url = `${protocol}${rawUrl}`;

  const headersObject = Object.fromEntries(
    headers.map((header: { key: string; value: string }) => [
      header.key,
      header.value,
    ])
  );

  return async () => {
    const startTime = performance.now();

    const fetchBody = method !== HttpMethods.GET ? body : undefined;

    const response = await fetch(url, {
      method,
      body: fetchBody,
      headers: headersObject,
    });

    const endTime = performance.now();

    const latencyMs = Math.trunc(endTime - startTime);

    const requestSizeBytes = fetchBody ? new Blob([body]).size : 0;

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
      },
    };
  };
};
