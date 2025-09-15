import { selectCode } from '@/store/slices/restClient/selectors';

import type { FC } from 'react';

import { useSelector } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

export const CodeGenerator: FC = () => {
  const code = useSelector(selectCode);

  return (
    <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
      {code?.generatedCode || ''}
    </SyntaxHighlighter>
  );
};
