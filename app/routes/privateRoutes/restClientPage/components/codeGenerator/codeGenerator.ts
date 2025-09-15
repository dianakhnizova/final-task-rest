import {
  CodeLanguage,
  CodeVariant,
  HttpMethods,
  Protocols,
} from '@/sources/enums';
import type { CodeRequestData } from '@/sources/interfaces';

import { codeGeneratorService } from '@/utils/codeGeneratorService';

export interface CodeGeneratorLoaderData {
  generatedCode: string | null;
  error: string | null;
}

export async function codeGenerator(request: {
  targetUrl: string | null;
  method: HttpMethods;
  protocol: Protocols;
}): Promise<CodeGeneratorLoaderData> {
  try {
    const { targetUrl: url, method } = request;

    const language = CodeLanguage.JAVASCRIPT;
    const variant = CodeVariant.FETCH;

    if (!url) {
      return {
        generatedCode: null,
        error: 'URL is required for code generation',
      };
    }

    const requestData: CodeRequestData = {
      url,
      method,
      headers: {},
      body: '',
    };

    const generatedCode = await codeGeneratorService.generateCode(
      language,
      variant,
      requestData
    );

    return {
      generatedCode,
      error: null,
    };
  } catch (error) {
    console.error('Code generation error:', error);
    return {
      generatedCode: null,
      error: `Failed to generate code: ${(error as Error).message}`,
    };
  }
}
