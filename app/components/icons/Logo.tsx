import { LOGO_URL } from '@/sources/constants';

import { header as messages } from '@/sources/messages/header';

import styles from './icon.module.css';

export const Logo = () => (
  <div className={styles.headerLogo}>
    <img src={LOGO_URL} alt={messages.textInsteadLogo} />
  </div>
);
