import type { NextApiRequest, NextApiResponse, NextPage } from 'next';
import type { ReactNode, ReactElement } from 'react';
import type { AppProps } from 'next/app';

declare global {
  type ApiHandler<TResponse> = (
    req: NextApiRequest,
    res: NextApiResponse
  ) => TResponse;

  interface NextApiRequestWithSessionData extends NextApiRequest {
    user?: SessionData;
  }

  type ExtendedApiHandler<TResponse> = (
    req: NextApiRequestWithSessionData,
    res: NextApiResponse
  ) => TResponse;

  type NextPageWithLayout<Props = {}, InitialProps = Props> = NextPage<
    Props,
    InitialProps
  > & {
    getLayout?: (page: ReactElement) => ReactNode;
  };

  type AppPropsWithLayout<Props> = AppProps<Props> & {
    Component: NextPageWithLayout<Props>;
  };
}
