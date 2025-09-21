import type { FC, ReactNode } from 'react';
import { useLayoutEffect } from 'react';
import { Variant } from '@/sources/enums';
import { images } from '@/sources/messages/images';
import ReactPortal from '@/components/reactPortal/ReactPortal';
import { useEscapeKey } from '@/utils/hooks/useEscapeKey';
import { Button } from '../button';
import styles from './modal.module.css';

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const Modal: FC<Props> = ({ isOpen, onClose, children }) => {
  useEscapeKey(() => onClose?.(), isOpen);

  useLayoutEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.container}>
        {onClose && (
          <Button
            onClick={onClose}
            variant={Variant.ICON}
            className={styles.closeButton}
          >
            <img
              src={'close.svg'}
              alt={images.close}
              className={styles.image}
            />
          </Button>
        )}

        {children}
      </div>
    </ReactPortal>
  );
};
