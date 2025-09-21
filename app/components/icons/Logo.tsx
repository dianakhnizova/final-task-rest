import { LOGO_URL } from '@/sources/constants/constants';
import { header as messages } from '@/sources/messages/header';
import styles from './icon.module.css';

export const Logo = () => (
  <div className={styles.headerLogo}>
    <img data-testid="icon" src={LOGO_URL} alt={messages.textInsteadLogo} />
  </div>
);
