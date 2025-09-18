import { CodeLanguage } from '../enums';

export const CURL_TEMPLATE = (
  method: string,
  url: string,
  headers: Record<string, string>,
  bodyString: string
) =>
  `
curl -X ${method} "${url}"${
    Object.keys(headers).length
      ? ` \\\n${Object.entries(headers)
          .map(([k, v]) => `-H "${k}: ${v}"`)
          .join(' \\\n')}`
      : ''
  }${bodyString ? ` \\\n-d '${bodyString}'` : ''}`.trim();

export const FETCH_TEMPLATE = (
  method: string,
  url: string,
  headers: Record<string, string>,
  bodyString: string
) =>
  `
fetch("${url}", {
  method: "${method}",
  ${Object.keys(headers).length ? `headers: ${JSON.stringify(headers, null, 2)},` : ''}
  ${bodyString ? `body: ${bodyString},` : ''}
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`.trim();

export const XHR_TEMPLATE = (
  method: string,
  url: string,
  headers: Record<string, string>,
  bodyString: string
) =>
  `
const xhr = new XMLHttpRequest();
xhr.open("${method}", "${url}");
${Object.entries(headers)
  .map(([k, v]) => `xhr.setRequestHeader("${k}", "${v}");`)
  .join('\n')}
xhr.onload = () => console.log(xhr.responseText);
xhr.onerror = () => console.error(xhr.statusText);
${bodyString ? `xhr.send(${JSON.stringify(bodyString)});` : 'xhr.send();'}`.trim();

export const NODE_TEMPLATE = (
  method: string,
  url: string,
  headers: Record<string, string>,
  bodyString: string
) =>
  `
const https = require('https');

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
${bodyString ? `req.write(${bodyString});` : ''}
req.end();`.trim();

export const PYTHON_TEMPLATE = (
  method: string,
  url: string,
  headers: Record<string, string>,
  bodyString: string
) =>
  `
import requests

response = requests.request(
  method='${method}',
  url='${url}',
  headers=${JSON.stringify(headers, null, 2)},
  ${bodyString ? `data=${bodyString}` : ''}
)
print(response.text)`.trim();

export const JAVA_TEMPLATE = (
  method: string,
  url: string,
  headers: Record<string, string>,
  bodyString: string
) =>
  `
import java.net.*;
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
  byte[] input = ${bodyString}.getBytes("utf-8");
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
System.out.println(response.toString());`.trim();

export const CSHARP_TEMPLATE = (
  method: string,
  url: string,
  headers: Record<string, string>,
  bodyString: string
) =>
  `
using System;
using System.Net.Http;
using System.Threading.Tasks;

var client = new HttpClient();
var request = new HttpRequestMessage(HttpMethod.${method}, "${url}");
${Object.entries(headers)
  .map(([k, v]) => `request.Headers.Add("${k}", "${v}");`)
  .join('\n')}
${bodyString ? `request.Content = new StringContent(${bodyString});` : ''}
var response = await client.SendAsync(request);
var content = await response.Content.ReadAsStringAsync();
Console.WriteLine(content);`.trim();

export const GO_TEMPLATE = (
  method: string,
  url: string,
  headers: Record<string, string>,
  bodyString: string
) =>
  `
package main

import (
  "fmt"
  "io/ioutil"
  "net/http"
  "strings"
)

func main() {
  client := &http.Client{}
  req, _ := http.NewRequest("${method}", "${url}", strings.NewReader(${bodyString}))
${Object.entries(headers)
  .map(([k, v]) => `  req.Header.Set("${k}", "${v}")`)
  .join('\n')}
  resp, err := client.Do(req)
  if err != nil { panic(err) }
  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(body))
}`.trim();

export const CODE_TEMPLATES: Record<CodeLanguage, typeof CURL_TEMPLATE> = {
  [CodeLanguage.CURL]: CURL_TEMPLATE,
  [CodeLanguage.JAVASCRIPT]: FETCH_TEMPLATE,
  [CodeLanguage.XHR]: XHR_TEMPLATE,
  [CodeLanguage.NODEJS]: NODE_TEMPLATE,
  [CodeLanguage.PYTHON]: PYTHON_TEMPLATE,
  [CodeLanguage.JAVA]: JAVA_TEMPLATE,
  [CodeLanguage.CSHARP]: CSHARP_TEMPLATE,
  [CodeLanguage.GO]: GO_TEMPLATE,
};
