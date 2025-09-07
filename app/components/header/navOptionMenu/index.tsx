import { Button } from '@/components/ui/button/Button';
import styles from '../Header.module.css';
import { Variant } from '@/sources/enums';
import { LanguageIcon, SunIcon } from '@/components/icons';
import { header as messages } from '@/sources/messages/header';

export const NavOptionMenu = () => {
  return (
    <div className={styles.right}>
      <Button variant={Variant.ICON}>
        <LanguageIcon />
      </Button>
      <Button variant={Variant.ICON}>
        <SunIcon />
      </Button>
      <Button>{messages.signIn}</Button>
    </div>
  );
};
