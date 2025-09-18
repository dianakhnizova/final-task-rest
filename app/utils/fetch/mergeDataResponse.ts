export const mergedDataResponse = (responseText: string, body: string) => {
  let parsedResponse: object;
  let parsedBody: object;
  let mergedData: unknown;

  try {
    parsedResponse = JSON.parse(responseText);
    parsedBody = JSON.parse(body);
  } catch {
    parsedResponse = responseText;
    parsedBody = body;
  }

  if (body && parsedResponse && typeof parsedResponse === 'object') {
    mergedData = { ...parsedBody, ...parsedResponse };
  } else {
    mergedData = parsedResponse ?? body;
  }

  return mergedData;
};
