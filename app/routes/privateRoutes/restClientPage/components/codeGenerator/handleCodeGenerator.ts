import type {
  CodeGeneratorLoaderData,
  CodeRequestData,
} from '@/sources/interfaces';

import { generateCode } from '@/utils/generateCode';

import { languageList } from './languageList';

export const handleCodeGenerator = async (
  requestData: CodeRequestData,
  setCode: (code: CodeGeneratorLoaderData) => void
) => {
  try {
    const generated: Record<string, string> = {};

    languageList.forEach(lang => {
      generated[lang] = generateCode(lang, requestData);
    });

    setCode({ generatedCode: JSON.stringify(generated, null, 2), error: null });
  } catch (error) {
    console.log('Error code generation', error);

    setCode({ generatedCode: null, error: (error as Error).message });
  }
};
