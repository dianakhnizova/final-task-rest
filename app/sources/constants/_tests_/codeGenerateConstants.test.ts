import { describe, expect, it } from 'vitest';
import { CodeLanguage } from '@/sources/enums';
import { CODE_TEMPLATES } from '../codeGenerateConstants';

describe('CODE_TEMPLATES', () => {
  const method = 'POST';
  const url = 'https://api.test.com';
  const headers = { 'Content-Type': 'application/json' };
  const bodyString = '{"test":true}';

  it('CURL template includes method, url, headers and body', () => {
    const result = CODE_TEMPLATES[CodeLanguage.CURL](
      method,
      url,
      headers,
      bodyString
    );
    expect(result).toContain(`curl -X ${method}`);
    expect(result).toContain(url);
    expect(result).toContain('-H "Content-Type: application/json"');
    expect(result).toContain(`-d '${bodyString}'`);
  });

  it('FETCH template includes fetch call with method, url, headers and body', () => {
    const result = CODE_TEMPLATES[CodeLanguage.JAVASCRIPT](
      method,
      url,
      headers,
      bodyString
    );
    expect(result).toContain(`fetch("${url}"`);
    expect(result).toContain(`method: "${method}"`);
    expect(result).toContain(`headers: ${JSON.stringify(headers, null, 2)}`);
    expect(result).toContain(`body: ${bodyString}`);
  });

  it('XHR template includes XMLHttpRequest with headers and body', () => {
    const result = CODE_TEMPLATES[CodeLanguage.XHR](
      method,
      url,
      headers,
      bodyString
    );
    expect(result).toContain(`xhr.open("${method}", "${url}")`);
    expect(result).toContain(
      `xhr.setRequestHeader("Content-Type", "application/json");`
    );
    expect(result).toContain(`xhr.send(${JSON.stringify(bodyString)})`);
  });

  it('NODEJS template includes https.request with method, url, headers and body', () => {
    const result = CODE_TEMPLATES[CodeLanguage.NODEJS](
      method,
      url,
      headers,
      bodyString
    );
    expect(result).toContain(`method: '${method}'`);
    expect(result).toContain(JSON.stringify(headers, null, 2));
    expect(result).toContain(`req.write(${bodyString});`);
  });

  it('PYTHON template includes requests.request with method, url, headers and body', () => {
    const result = CODE_TEMPLATES[CodeLanguage.PYTHON](
      method,
      url,
      headers,
      bodyString
    );
    expect(result).toContain(`method='${method}'`);
    expect(result).toContain(`url='${url}'`);
    expect(result).toContain(JSON.stringify(headers, null, 2));
    expect(result).toContain(`data=${bodyString}`);
  });

  it('JAVA template includes HttpURLConnection with method, url, headers and body', () => {
    const result = CODE_TEMPLATES[CodeLanguage.JAVA](
      method,
      url,
      headers,
      bodyString
    );
    expect(result).toContain(
      `HttpURLConnection con = (HttpURLConnection) url.openConnection();`
    );
    expect(result).toContain(`con.setRequestMethod("${method}");`);
    expect(result).toContain(
      `con.setRequestProperty("Content-Type", "application/json");`
    );
    expect(result).toContain(`${bodyString}.getBytes("utf-8")`);
  });

  it('CSHARP template includes HttpClient request with method, url, headers and body', () => {
    const result = CODE_TEMPLATES[CodeLanguage.CSHARP](
      method,
      url,
      headers,
      bodyString
    );
    expect(result).toContain(`HttpMethod.${method}`);
    expect(result).toContain(url);
    expect(result).toContain(
      `request.Headers.Add("Content-Type", "application/json");`
    );
    expect(result).toContain(
      `request.Content = new StringContent(${bodyString});`
    );
  });

  it('GO template includes http.NewRequest with method, url, headers and body', () => {
    const result = CODE_TEMPLATES[CodeLanguage.GO](
      method,
      url,
      headers,
      bodyString
    );
    expect(result).toContain(
      `http.NewRequest("${method}", "${url}", strings.NewReader(${bodyString}))`
    );
    expect(result).toContain(
      `req.Header.Set("Content-Type", "application/json")`
    );
  });
});
