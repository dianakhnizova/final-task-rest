import type { FC, PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { DisplayName } from '@/sources/enums';

import { WRAPPER_ROOT_PORTAL_ID } from '@/sources/constants/constants';

import { createWrapperPortal } from '@/utils/createWrapperPortal';

interface Props {
  wrapperId?: string;
}

export const ReactPortal: FC<PropsWithChildren<Props>> = ({
  children,
  wrapperId = WRAPPER_ROOT_PORTAL_ID,
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    const portalElement =
      document.getElementById(wrapperId) ?? createWrapperPortal(wrapperId);

    setWrapperElement(portalElement);
  }, [wrapperId]);

  if (!wrapperElement) return null;

  return createPortal(children, wrapperElement);
};

ReactPortal.displayName = DisplayName.PORTAL;

export default ReactPortal;
