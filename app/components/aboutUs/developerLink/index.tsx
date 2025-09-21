import { developerLinkList } from '@/sources/lists/developerList';
import styles from './developerlink.module.css';

export const Developerlink = () => {
  return (
    <div className={styles.container}>
      {developerLinkList.map(link => (
        <a
          key={link.gitHub}
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
