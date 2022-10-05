import {
  type GetServerSidePropsContext,
  type GetServerSideProps,
  PreviewData,
} from 'next/types';
import { type UserRole } from './schemas/UserRole';
import SessionDataSchema, { type SessionData } from './schemas/SessionData';
import { ParsedUrlQuery } from 'querystring';

const protectedSsr =
  <
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
  >({
    allowedRoles,
    redirect = {
      destination: '/404',
      permanent: false,
    },
  }: {
    allowedRoles: Array<UserRole>;
    redirect?: {
      destination: string;
      permanent: boolean;
    };
  }) =>
  (getServerSidePropsFn?: GetServerSideProps<P, Q, D>) => {
    return async function protectedServerSidePropsCreator(
      context: GetServerSidePropsContext<Q, D>
    ) {
      const httpCookie = context.req.cookies['ch-http'];
      const sessionData = SessionDataSchema.safeParse(httpCookie);

      if (!sessionData.success) {
        return {
          redirect,
        };
      }

      const session = sessionData.data as SessionData;

      if (!allowedRoles.includes(session.role)) {
        return {
          redirect,
        };
      }

      if (!getServerSidePropsFn) {
        return {
          props: { session },
        };
      }
      const otherProps = await getServerSidePropsFn(context);

      if ('redirect' in otherProps) {
        return otherProps.redirect;
      }

      const props =
        'props' in otherProps ? { ...otherProps.props, session } : session;
      return {
        ...otherProps,
        props,
      };
    };
  };

export default protectedSsr;
