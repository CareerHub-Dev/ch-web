import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import store from '@/store/index';
import { Provider } from 'react-redux';
import { AuthContextProvider } from '@/store/auth-context';
import { useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import ToastContainer from '@/components/layout/ToastContainer';

import 'react-image-crop/dist/ReactCrop.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/MarkdownEditor.scss';
import '@/styles/globals.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout<any>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  );
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthContextProvider>
          <Provider store={store}>
            <Component {...pageProps} />
            <ToastContainer />
          </Provider>
        </AuthContextProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
