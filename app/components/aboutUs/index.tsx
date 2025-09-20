import { useTranslation } from 'react-i18next';
import { developerList } from '@/sources/lists/developerList';
import { images as altMessages } from '@/sources/messages/images';
import styles from './AboutUs.module.css';

export const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.developersContainer}>
        {developerList.map(developer => (
          <div key={developer.nameKey} className={styles.developers}>
            <p>{t(developer.nameKey)}</p>

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

      <p className={styles.project}>{t('aboutUs.project')}</p>

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
