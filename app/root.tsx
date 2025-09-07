import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { ErrorBoundaryComponent } from './components/errorBoundary';

import type { Route } from './+types/root';
import './global.css';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>REST client</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <div id="root">{children}</div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error, params }: Route.ErrorBoundaryProps) {
  return <ErrorBoundaryComponent error={error} params={params} />;
}
