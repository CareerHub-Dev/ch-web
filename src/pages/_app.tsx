import type { AppProps } from 'next/app';
import store from '@/store/index';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { AuthContextProvider } from '@/store/auth-context';
import CommonLayout from '@/components/layout/CommonLayout';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Provider store={store}>
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
            style={{ zIndex: 50 }}
          />
        </CommonLayout>
      </Provider>
    </AuthContextProvider>
  );
}

export default MyApp;
