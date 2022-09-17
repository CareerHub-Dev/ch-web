import type { AppProps } from 'next/app';
import store from '@/store/index';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { AuthContextProvider } from '@/store/auth-context';
import { useState } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import 'react-image-crop/dist/ReactCrop.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/MarkdownEditor.scss';
import '@/styles/globals.scss';

const CommonLayout = dynamic(() => import('@/components/layout/CommonLayout'), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps<any>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthContextProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <CommonLayout>
              <Component {...pageProps} />
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ zIndex: 1000 }}
              />
            </CommonLayout>
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </AuthContextProvider>
  );
}

export default MyApp;
