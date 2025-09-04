import { HomePage } from '@/pages/home-page/HomePage';

export function meta() {
  return [
    { title: 'REST client App' },
    { name: 'description', content: 'Welcome to REST client App!' },
  ];
}

export default function Home() {
  return <HomePage />;
}
