import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import { ErrorBoundaryComponent } from './components/errorBoundary';

import type { Route } from './+types/root';
import './global.css';
import Wrapper from './components/wrapper';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { root } from './sources/messages/root';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AppInitializer from './components/appInitializer';
import { Toaster } from 'react-hot-toast';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{root.appTitle}</title>
        <Meta />

        <Links />
      </head>

      <body>
        <Provider store={store}>
          <AppInitializer />

          <div id="root">
            <Header />
            <Wrapper>{children}</Wrapper>
            <Footer />
          </div>

          <Toaster position="bottom-right" />

          <ScrollRestoration />
          <Scripts />
        </Provider>
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
