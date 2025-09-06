import { aboutPage as messages } from '@/sources/messages/aboutPage';

export function meta() {
  return [
    { title: messages.metaTitle },
    { name: messages.metaName, content: messages.metaContent },
  ];
}

export default function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}
