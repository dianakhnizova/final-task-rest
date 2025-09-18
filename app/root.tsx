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
import i18n, { getLocale } from './i18n.server';
import { TOAST_DURATION } from './sources/constants/constants';
import { Language, Theme } from './sources/enums';

export async function loader({ request }: { request: Request }) {
  const locale = await getLocale(request);
  console.log('Loader locale:', locale);
  await i18n.changeLanguage(locale);
  return Response.json({ locale });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={Language.EN} data-theme={Theme.DARK}>
      <Head />

      <body>
        <Provider store={store}>
          <AppInitializer />

          <div id="root">
            <Header />
            <Wrapper>{children}</Wrapper>
            <Footer />
          </div>

          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: TOAST_DURATION,
            }}
          />

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
