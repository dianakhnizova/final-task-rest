import { CodeLanguage } from '@/sources/enums';

import type { CodeGeneratorLoaderData } from './codeGenerator';

interface CodeResultProps {
  code: CodeGeneratorLoaderData | null;
  language: CodeLanguage;
}

const CodeResult: React.FC<CodeResultProps> = ({ code, language }) => {
  return (
    <div>
      <div>
        <p>{language}</p>
      </div>
      <pre>
        <code>{code?.generatedCode || ''}</code>
      </pre>
    </div>
  );
};

export default CodeResult;
