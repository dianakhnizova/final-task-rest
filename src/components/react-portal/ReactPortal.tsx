import { WRAPPER_ROOT_PORTAL_ID } from '@/sources/constants';
import { createWrapperPortal } from '@/utils/createWrapperPortal';
import type { FC } from 'react';
import { memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  wrapperId?: string;
}

export const ReactPortal: FC<Props> = memo(
  ({ children, wrapperId = WRAPPER_ROOT_PORTAL_ID }) => {
    const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
      null
    );

    useEffect(() => {
      let portalElement = document.getElementById(wrapperId);

      if (!portalElement) {
        portalElement = createWrapperPortal(wrapperId);
      }

      setWrapperElement(portalElement);
    }, [wrapperId]);

    if (!wrapperElement) return null;

    return createPortal(children, wrapperElement);
  }
);

export default ReactPortal;
