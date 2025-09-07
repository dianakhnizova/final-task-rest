import styles from './Footer.module.css';
import { GithubLogo, RsSchoolLogo } from '@/components/icons';

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.separator}></div>
      <div className={styles.content}>
        <a
          href="https://github.com/dianakhnizova/final-task-rest"
          className={styles.link}
        >
          <GithubLogo width="1.5rem" height="1.5rem" />{' '}
          <span>Github Project</span>
        </a>
        <a href="https://rs.school/courses/reactjs" className={styles.link}>
          <RsSchoolLogo width="1.5rem" height="1.5rem" />
          <span>Rs School Course</span>
        </a>
        <div>© 2025</div>
      </div>
    </footer>
  );
};
