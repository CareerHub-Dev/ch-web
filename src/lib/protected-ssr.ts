import {
  type GetServerSidePropsContext,
  type Redirect,
  PreviewData,
} from 'next/types';
import { type UserRole } from './schemas/UserRole';
import { ParsedUrlQuery } from 'querystring';
import sessionMiddleware from './middleware/sessionMiddleware';

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
    redirect?: Redirect;
  }) =>
  (getServerSidePropsFn?: GetServerSidePropsWithSession<P, Q, D>) => {
    return async function protectedServerSidePropsCreator(
      context: GetServerSidePropsContext<Q, D>
    ) {
      const session = sessionMiddleware(context, allowedRoles);

      if ('error' in session) {
        return {
          redirect,
        };
      }

      if (!getServerSidePropsFn) {
        return {
          props: { session },
        };
      }
      const otherProps = await getServerSidePropsFn({ ...context, session });

      if ('redirect' in otherProps) {
        return { redirect: otherProps.redirect };
      }

      const props =
        'props' in otherProps ? { ...otherProps.props, session } : session;

      const revalidatedProps = {
        ...otherProps,
        props,
      };

      return revalidatedProps;
    };
  };

export default protectedSsr;
