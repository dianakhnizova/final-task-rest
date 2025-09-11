import '@/global.css';
import { store } from '@/store/store';

import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { Outlet, Scripts, ScrollRestoration } from 'react-router';

import AppInitializer from '@/components/appInitializer';
import { Footer } from '@/components/footer';
import Head from '@/components/head';
import { Header } from '@/components/header';
import Wrapper from '@/components/wrapper';

import type { Route } from './+types/root';
import { ErrorBoundaryComponent } from './components/errorBoundary';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <Head />

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
