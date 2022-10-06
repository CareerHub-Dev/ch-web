import type {
  NextApiRequest,
  NextApiResponse,
  NextPage,
  GetServerSidePropsContext,
  GetServerSideProps,
  PreviewData,
} from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { ReactNode, ReactElement } from 'react';
import type { AppProps } from 'next/app';
import type { SessionData } from '@/lib/schemas/SessionData';

declare global {
  type ApiHandler<TResponse> = (
    req: NextApiRequest,
    res: NextApiResponse
  ) => TResponse;

  type GetServerSidePropsContextWithSession<
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
  > = GetServerSidePropsContext & {
    session: SessionData;
  };

  type GetServerSidePropsWithSession<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
  > = (
    context: GetServerSidePropsContextWithSession<Q, D>
  ) => Promise<GetServerSidePropsResult<P>>;

  type NextApiRequestWithSessionData = NextApiRequest & {
    user?: SessionData;
  };

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
