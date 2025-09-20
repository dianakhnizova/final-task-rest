export const mergedDataResponse = (
  responseText: string,
  body: string | null
) => {
  let parsedResponse: unknown;
  let parsedBody: unknown;
  let mergedData: unknown;

  try {
    parsedResponse = JSON.parse(responseText);
    parsedBody = body ? JSON.parse(body) : null;
  } catch {
    parsedResponse = responseText;
    parsedBody = body;
  }

  if (body && parsedResponse && typeof parsedResponse === 'object') {
    mergedData = {
      ...(parsedBody as Record<string, unknown>),
      ...(parsedResponse as Record<string, unknown>),
    };
  } else {
    mergedData = parsedResponse ?? body;
  }

  return mergedData;
};
