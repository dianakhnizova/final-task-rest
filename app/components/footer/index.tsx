import { useTranslation } from 'react-i18next';
import { WrapperId } from '@/sources/enums';
import {
  GITHUB_PROJECT_URL,
  RSS_COURSE_URL,
} from '@/sources/constants/constants';
import { GithubLogo, RsSchoolLogo } from '@/components/icons';
import Wrapper from '@/components/wrapper';
import styles from './Footer.module.css';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.container}>
      <div className={styles.separator}></div>

      <Wrapper id={WrapperId.footer} className={styles.content}>
        <a
          href={GITHUB_PROJECT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <GithubLogo />
          <span>{t('footer.githubProject')}</span>
        </a>

        <a
          href={RSS_COURSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          <RsSchoolLogo />
          <span>{t('footer.rsSchoolCourse')}</span>
        </a>

        <div>{t('footer.copyright')}</div>
      </Wrapper>
    </footer>
  );
};
