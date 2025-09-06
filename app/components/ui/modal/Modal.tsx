import type { FC, ReactNode } from 'react';
import { useLayoutEffect } from 'react';
import styles from './Modal.module.css';
import ReactPortal from '@/components/react-portal/ReactPortal';
import { useEscapeKey } from '@/utils/hooks/useEscapeKey';
import { Button } from '../button/Button';
import { Variant } from '@/sources/enums';
import { messages } from '@/sources/messages';

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
            variant={Variant.SECONDARY}
            className={styles.closeButton}
          >
            <img
              src={'close.svg'}
              alt={messages.alt.close}
              className={styles.image}
            />
          </Button>
        )}

        {children}
      </div>
    </ReactPortal>
  );
};
