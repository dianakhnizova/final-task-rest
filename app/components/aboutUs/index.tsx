import { ABOUT_PROJECT } from '@/sources/constants/constants';
import { developerList } from '@/sources/lists/developerList';
import { aboutUs as aboutUsMessages } from '@/sources/messages/aboutUs';
import { images as altMessages } from '@/sources/messages/images';

import styles from './AboutUs.module.css';

export const AboutUs = () => {
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
        <p className={styles.title}>{aboutUsMessages.title}</p>

        <div className={styles.info}>
          <p className={styles.courseInfo}>{aboutUsMessages.name}</p>
          <p className={styles.courseInfo}>{aboutUsMessages.year}</p>
        </div>
      </div>
    </div>
  );
};
