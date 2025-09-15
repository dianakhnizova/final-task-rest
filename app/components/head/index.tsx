import type { FC } from 'react';

import { Links, Meta } from 'react-router';

import { LOGO_URL } from '@/sources/constants/constants';
import { root } from '@/sources/messages/root';

export const Head: FC = () => {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{root.appTitle}</title>
      <link rel="icon" href={LOGO_URL} />

      <Meta />
      <Links />
    </head>
  );
};

export default Head;
