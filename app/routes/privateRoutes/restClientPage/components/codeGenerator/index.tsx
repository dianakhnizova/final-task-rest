import {
  selectCode,
  selectLanguage,
} from '@/store/slices/restClient/selectors';

import type { FC } from 'react';

import { useSelector } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const CodeGenerator: FC = () => {
  const code = useSelector(selectCode);
  const language = useSelector(selectLanguage);

  return (
    <SyntaxHighlighter language={language?.toLowerCase()} style={atomDark}>
      {code?.generatedCode || ''}
    </SyntaxHighlighter>
  );
};
