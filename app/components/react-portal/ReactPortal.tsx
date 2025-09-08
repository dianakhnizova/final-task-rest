import { WRAPPER_ROOT_PORTAL_ID } from '@/sources/constants';
import { DisplayName } from '@/sources/enums';
import { createWrapperPortal } from '@/utils/createWrapperPortal';
import type { FC, ReactNode } from 'react';
import { memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode;
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

ReactPortal.displayName = DisplayName.PORTAL;

export default ReactPortal;
