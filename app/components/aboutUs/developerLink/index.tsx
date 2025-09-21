import { developerLinkList } from '@/sources/lists/developerList';
import styles from './Developerlink.module.css';

export const Developerlink = () => {
  return (
    <div className={styles.container}>
      {developerLinkList.map(link => (
        <a
          href={link.gitHub}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {link.gitHub}
        </a>
      ))}
    </div>
  );
};
