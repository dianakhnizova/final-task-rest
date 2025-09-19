import { Variant } from '@/sources/enums';

import { SunIcon } from '@/components/icons';
import { LanguageToggler } from '@/components/togglers/languageToggler';
import { Button } from '@/components/ui/button';

import styles from '../Header.module.css';
import { AuthBar } from './components/authBar';

export const NavOptionMenu = () => {
  return (
    <div className={styles.right}>
      <LanguageToggler />

      <Button variant={Variant.ICON}>
        <SunIcon />
      </Button>

      <AuthBar />
    </div>
  );
};
