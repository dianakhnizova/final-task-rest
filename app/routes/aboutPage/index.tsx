import { aboutPage as messages } from '@/sources/messages/aboutPage';

import { pageMeta } from '@/utils/metaHelpers.ts';

export const meta = pageMeta(messages);

export default function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}
