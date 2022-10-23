import store from '@/context/index';
import { Provider } from 'react-redux';
import { AuthContextProvider } from '@/context/auth-context';
import { useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import ToastContainer from '@/components/layout/ToastContainer';
import Head from 'next/head';

import 'react-image-crop/dist/ReactCrop.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/MarkdownEditor.scss';
import '@/styles/globals.scss';

function MyApp({ Component, pageProps }: AppPropsWithLayout<any>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
          },
        },
      })
  );
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Provider store={store}>
            <Hydrate state={pageProps.dehydratedState}>
              {getLayout(<Component {...pageProps} />)}
              <ToastContainer />
            </Hydrate>
          </Provider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
