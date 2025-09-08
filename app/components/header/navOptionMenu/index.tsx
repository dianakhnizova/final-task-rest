import { Button } from '@/components/ui/button';
import styles from '../Header.module.css';
import { Variant } from '@/sources/enums';
import { LanguageIcon, SunIcon } from '@/components/icons';
import { AuthBar } from '@/components/authBar';

export const NavOptionMenu = () => {
  return (
    <div className={styles.right}>
      <Button variant={Variant.ICON}>
        <LanguageIcon />
      </Button>

      <Button variant={Variant.ICON}>
        <SunIcon />
      </Button>

      <AuthBar />
    </div>
  );
};
