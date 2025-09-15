import postmanCodeGeneratorsModule from 'postman-code-generators';
import postmanCollectionModule from 'postman-collection';

import { CodeDefaultOptions } from '@/sources/constants';
import type { CodeLanguage, CodeVariant } from '@/sources/enums';
import type { CodeOptions, CodeRequestData } from '@/sources/interfaces';

const { convert, getLanguageList } = postmanCodeGeneratorsModule;

const { Request } = postmanCollectionModule;

class CodeGeneratorService {
  async generateCode(
    language: CodeLanguage,
    variant: CodeVariant,
    requestData: CodeRequestData,
    options: CodeOptions = CodeDefaultOptions
  ): Promise<string> {
    console.log(getLanguageList()); // todo remove after dev

    if (!requestData.url) {
      throw new Error('URL is required for code generation');
    }

    if (!language || !variant) {
      throw new Error('Language and variant are required');
    }

    try {
      const postmanRequest = this.createPostmanRequest(requestData);
      const mergedOptions = { ...CodeDefaultOptions, ...options };

      const fragment = await this.convertCode(
        language,
        variant,
        postmanRequest,
        mergedOptions
      );

      return this.replaceVariablesWithValues(fragment, requestData);
    } catch (error) {
      console.error('Full error stack:', error);

      console.error('Code generation error:', error);
      throw new Error(`Failed to generate code: ${(error as Error).message}`);
    }
  }

  private createPostmanRequest(requestData: CodeRequestData): Request {
    const { url, method, headers, body } = requestData;

    const requestConfig = {
      url: url || '',
      method: method || 'GET',
      header: {},
      body: {},
    };

    if (headers && Object.keys(headers).length > 0) {
      requestConfig.header = Object.entries(headers).map(([key, value]) => ({
        key,
        value: String(value),
      }));
    }

    if (body) {
      requestConfig.body = {
        mode: 'raw' as const,
        raw: typeof body === 'string' ? body : JSON.stringify(body),
      };
    }

    return new Request(requestConfig);
  }

  private async convertCode(
    language: string,
    variant: string,
    request: Request,
    options: CodeOptions
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const timeout = setTimeout(() => {
          reject(new Error('Code generation timeout'));
        }, 10000);

        convert(
          language,
          variant,
          request,
          options,
          (error: Error | null, fragment: string) => {
            clearTimeout(timeout);
            if (error) {
              console.error('Convert error:', error);
              reject(error);
            } else if (fragment) {
              resolve(fragment);
            } else {
              reject(new Error('No code fragment generated'));
            }
          }
        );
      } catch (syncError) {
        console.error('Sync error in convertCode:', syncError);
        reject(syncError);
      }
    });
  }

  private replaceVariablesWithValues(
    snippet: string,
    requestData: CodeRequestData
  ): string {
    let result = snippet;

    if (requestData.url) {
      result = result.replace(/\$\{url\}/g, requestData.url);
      result = result.replace(/\$url/g, requestData.url);
    }

    if (requestData.headers) {
      Object.entries(requestData.headers).forEach(([key, value]) => {
        const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
        result = result.replace(regex, String(value));
      });
    }

    if (requestData.body) {
      const bodyString =
        typeof requestData.body === 'string'
          ? requestData.body
          : JSON.stringify(requestData.body);

      result = result.replace(/\$\{body\}/g, bodyString);
      result = result.replace(/\$body/g, bodyString);
    }

    result = result.replace(/\$\{\w+(?:\.\w+)*\}/g, '');

    return result;
  }
}

export const codeGeneratorService = new CodeGeneratorService();
