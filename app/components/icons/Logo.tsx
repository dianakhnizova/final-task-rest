import styles from './icon.module.css';
import { header as messages } from '@/sources/messages/header';

export const Logo = () => (
  <div className={styles.headerLogo}>
    <img
      src="https://raw.githubusercontent.com/dianakhnizova/StudioTeams/develop/src/components/logo/snake.svg"
      alt={messages.textInsteadLogo}
    />
  </div>
);
