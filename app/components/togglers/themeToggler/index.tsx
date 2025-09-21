import { Variant } from '@/sources/enums';
import { SunIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/utils/hooks/useTheme';

export const ThemeToggler = () => {
  const { toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} variant={Variant.ICON}>
      <SunIcon />
    </Button>
  );
};
