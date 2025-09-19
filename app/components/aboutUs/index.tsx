import { useTranslation } from 'react-i18next';
import { ABOUT_PROJECT } from '@/sources/constants/constants';
import { developerList } from '@/sources/lists/developerList';
import { images as altMessages } from '@/sources/messages/images';
import styles from './AboutUs.module.css';

export const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.developersContainer}>
        {developerList.map(developer => (
          <div key={developer.name} className={styles.developers}>
            <p>{developer.name}</p>

            <img
              src={developer.photo}
              alt={altMessages.developer}
              className={styles.image}
            />

            <a
              href={developer.gitHub}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {developer.gitHub}
            </a>
          </div>
        ))}
      </div>

      <p className={styles.project}>{ABOUT_PROJECT}</p>

      <div className={styles.course}>
        <p className={styles.title}>{t('aboutUs.title')}</p>

        <div className={styles.info}>
          <p className={styles.courseInfo}>{t('aboutUs.name')}</p>
          <p className={styles.courseInfo}>{t('aboutUs.year')}</p>
        </div>
      </div>
    </div>
  );
};
