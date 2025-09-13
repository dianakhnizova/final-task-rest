import fetchParsed from './fetchParsed';
import fetchPrepare from './fetchPrepare';
import fetchWithErrorHandling from './fetchWithErrorHandling';

export default async function fetchData() {
  const { url, options } = fetchPrepare('test.com'); //todo - use data from redux
  const response = await fetchWithErrorHandling(url, options);
  const responseParsed = fetchParsed(response);
  console.log('responseParsed = ', responseParsed);
}
