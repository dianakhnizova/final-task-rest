import '@/global.css';
import { store } from '@/store/store';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import {
  type LoaderFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router';
import AppInitializer from '@/components/appInitializer';
import { Footer } from '@/components/footer';
import Head from '@/components/head';
import { Header } from '@/components/header';
import Wrapper from '@/components/wrapper';
import type { Route } from './+types/root';
import { ErrorBoundaryComponent } from './components/errorBoundary';
import i18n from './i18n.client';
import { getLocale } from './i18n.server';
import { TOAST_DURATION } from './sources/constants/constants';
import { Theme } from './sources/enums';

export const loader: LoaderFunction = async ({ request }) => {
  const locale = await getLocale(request);
  return { locale };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { locale } = useLoaderData<{ locale: string }>();

  useEffect(() => {
    if (i18n && typeof i18n.changeLanguage === 'function') {
      i18n.changeLanguage(locale);
    } else {
      console.log('i18n is not properly initialized:', i18n);
    }
  }, [locale]);

  return (
    <html lang={locale} data-theme={Theme.DARK}>
      <Head />

      <body>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
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
          </I18nextProvider>
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
