import styles from './Footer.module.css';
import { GithubLogo, RsSchoolLogo } from '@/components/icons';
import { GITHUB_PROJECT_URL, RSS_COURSE_URL } from '@/sources/constants.ts';
import { footer } from '@/sources/messages/footer.ts';

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.separator}></div>

      <div className={styles.content}>
        <a href={GITHUB_PROJECT_URL} className={styles.link}>
          <GithubLogo width="1.5rem" height="1.5rem" />
          <span>{footer.githubProject}</span>
        </a>
        <a href={RSS_COURSE_URL} className={styles.link}>
          <RsSchoolLogo width="1.5rem" height="1.5rem" />
          <span>{footer.rsSchoolCourse}</span>
        </a>
        <div>{footer.copyright}</div>
      </div>
    </footer>
  );
};
