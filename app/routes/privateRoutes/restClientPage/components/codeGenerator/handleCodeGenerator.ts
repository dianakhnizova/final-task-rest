import type { CodeLanguage } from '@/sources/enums';
import type {
  CodeGeneratorLoaderData,
  CodeRequestData,
} from '@/sources/interfaces';

import { generateCode } from '@/utils/generateCode';

export const handleCodeGenerator = async (
  requestData: CodeRequestData,
  language: CodeLanguage,
  setCode: (code: CodeGeneratorLoaderData) => void
) => {
  try {
    const generatedCode = generateCode(language, requestData);

    setCode({ generatedCode, error: null });
  } catch (error) {
    console.log('Error code generation', error);

    setCode({ generatedCode: null, error: (error as Error).message });
  }
};
