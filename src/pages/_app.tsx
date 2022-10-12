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
            retry: false,
          },
        },
      })
  );  
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
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
  );
}

export default MyApp;
