import { GITHUB_PROJECT_URL, RSS_COURSE_URL } from '@/sources/constants';
import { WrapperId } from '@/sources/enums';

import { footer } from '@/sources/messages/footer';

import { GithubLogo, RsSchoolLogo } from '@/components/icons';
import Wrapper from '@/components/wrapper';

import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.separator}></div>

      <Wrapper id={WrapperId.footer} className={styles.content}>
        <a href={GITHUB_PROJECT_URL} className={styles.link}>
          <GithubLogo />
          <span>{footer.githubProject}</span>
        </a>

        <a href={RSS_COURSE_URL} className={styles.link}>
          <RsSchoolLogo />
          <span>{footer.rsSchoolCourse}</span>
        </a>

        <div>{footer.copyright}</div>
      </Wrapper>
    </footer>
  );
};
