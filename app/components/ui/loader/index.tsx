import type { FC } from 'react';

import { DisplayName } from '@/sources/enums';

export const Loader: FC = () => {
  return <>Loading...</>;
};

Loader.displayName = DisplayName.LOADER;
