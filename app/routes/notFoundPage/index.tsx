import type { Route } from '../+types/404';

export function meta({ location }: Route.MetaArgs) {
  return [
    { title: `REST client App / Error 404` },
    {
      name: 'description',
      content: `Error 404 / Page not Found - ${location.pathname}`,
    },
  ];
}

export default function Page404() {
  return <>Error 404 / Page not Found</>;
}
