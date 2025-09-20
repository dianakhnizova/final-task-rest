import { LanguageToggler } from '@/components/togglers/languageToggler';
import { ThemeToggler } from '@/components/togglers/themeToggler';
import styles from '../Header.module.css';
import { AuthBar } from './components/authBar';

export const NavOptionMenu = () => {
  return (
    <div className={styles.right}>
      <LanguageToggler />

      <ThemeToggler />

      <AuthBar />
    </div>
  );
};
