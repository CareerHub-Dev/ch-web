import { SessionContextProvider } from "@/context/session-context";
import { useState } from "react";
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import ToastContainer from "@/components/layout/ToastContainer";
import Head from "next/head";

import "react-image-crop/dist/ReactCrop.css";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.scss";

function getDefaultQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: true,
                retryDelay: (attemptIndex) =>
                    Math.min(1000 * 2 ** attemptIndex, 30000),
            },
        },
    });
}

function MyApp({ Component, pageProps }: AppPropsWithLayout<any>) {
    const [queryClient] = useState(getDefaultQueryClient);
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                ></meta>
                <meta name="theme-color" content="#ffffff" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="shortcut icon" href="/favicon.ico"></link>
                <link
                    rel="apple-touch-icon"
                    href="/apple-touch-icon.png"
                ></link>
            </Head>
            <QueryClientProvider client={queryClient}>
                <SessionContextProvider>
                    <Hydrate state={pageProps.dehydratedState}>
                        {getLayout(<Component {...pageProps} />)}
                        <ToastContainer />
                    </Hydrate>
                </SessionContextProvider>
            </QueryClientProvider>
        </>
    );
}

export default MyApp;
