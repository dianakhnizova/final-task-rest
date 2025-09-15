import { CodeLanguage } from '@/sources/enums';
import type { CodeRequestData } from '@/sources/interfaces';

export function generateCode(
  language: CodeLanguage,
  request: CodeRequestData
): string {
  const { url, method = 'GET', headers = {}, body } = request;

  if (!url) return 'Cannot generate code: URL is required';

  const headerString = Object.entries(headers)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');

  const bodyString =
    body != null
      ? typeof body === 'string'
        ? body
        : JSON.stringify(body, null, 2)
      : '';

  switch (language) {
    case CodeLanguage.CURL:
      return `curl -X ${method} "${url}"${
        headerString
          ? ` \\\n${Object.entries(headers)
              .map(([k, v]) => `-H "${k}: ${v}"`)
              .join(' \\\n')}`
          : ''
      }${bodyString ? ` \\\n-d '${bodyString}'` : ''}`;

    case CodeLanguage.JAVASCRIPT:
      return `fetch("${url}", {
  method: "${method}",
  ${Object.keys(headers).length ? `headers: ${JSON.stringify(headers, null, 2)},` : ''}
  ${bodyString ? `body: ${JSON.stringify(bodyString)},` : ''}
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`;

    case CodeLanguage.XHR:
      return `const xhr = new XMLHttpRequest();
xhr.open("${method}", "${url}");
${Object.entries(headers)
  .map(([k, v]) => `xhr.setRequestHeader("${k}", "${v}");`)
  .join('\n')}
xhr.onload = () => console.log(xhr.responseText);
xhr.onerror = () => console.error(xhr.statusText);
${bodyString ? `xhr.send(${JSON.stringify(bodyString)});` : 'xhr.send();'}`;

    case CodeLanguage.NODEJS:
      return `const https = require('https');

const options = {
  method: '${method}',
  headers: ${JSON.stringify(headers, null, 2)}
};

const req = https.request('${url}', options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => console.log(data));
});

req.on('error', err => console.error(err));
${bodyString ? `req.write(${JSON.stringify(bodyString)});` : ''}
req.end();`;

    case CodeLanguage.PYTHON:
      return `import requests

response = requests.request(
  method='${method}',
  url='${url}',
  headers=${JSON.stringify(headers, null, 2)},
  ${bodyString ? `data=${JSON.stringify(bodyString)}` : ''}
)
print(response.text)`;

    case CodeLanguage.JAVA:
      return `import java.net.*;
import java.io.*;

URL url = new URL("${url}");
HttpURLConnection con = (HttpURLConnection) url.openConnection();
con.setRequestMethod("${method}");
${Object.entries(headers)
  .map(([k, v]) => `con.setRequestProperty("${k}", "${v}");`)
  .join('\n')}
${
  bodyString
    ? `con.setDoOutput(true);
try(OutputStream os = con.getOutputStream()) {
  byte[] input = ${JSON.stringify(bodyString)}.getBytes("utf-8");
  os.write(input, 0, input.length);
}`
    : ''
}
BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"));
StringBuilder response = new StringBuilder();
String responseLine;
while ((responseLine = br.readLine()) != null) {
    response.append(responseLine.trim());
}
System.out.println(response.toString());`;

    case CodeLanguage.CSHARP:
      return `using System;
using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.${method}, "${url}");
${Object.entries(headers)
  .map(([k, v]) => `request.Headers.Add("${k}", "${v}");`)
  .join('\n')}
${bodyString ? `request.Content = new StringContent(${JSON.stringify(bodyString)});` : ''}
var response = await client.SendAsync(request);
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);`;

    case CodeLanguage.GO:
      return `package main

import (
  "fmt"
  "io/ioutil"
  "net/http"
  "strings"
)

func main() {
  client := &http.Client{}
  req, _ := http.NewRequest("${method}", "${url}", strings.NewReader(${bodyString ? JSON.stringify(bodyString) : '""'}))
${Object.entries(headers)
  .map(([k, v]) => `  req.Header.Set("${k}", "${v}")`)
  .join('\n')}
  resp, err := client.Do(req)
  if err != nil { panic(err) }
  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(body))
}`;
    default:
      return 'Code generation for this language is not supported';
  }
}
