export async function parseResponse(response: Response) {
  const contentType = response.headers.get('content-type');

  if (contentType?.includes('application/json')) {
    return await response.json();
  }

  return await response.text();
}
