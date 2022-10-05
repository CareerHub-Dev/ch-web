import { type GetServerSidePropsContext } from 'next/types';
import verifyAuthority from './api/local/helpers/verify-authority';
import verifySessionData from './api/local/helpers/verify-session-data';
import { type UserRole } from './schemas/UserRole';
import { type SessionData } from './schemas/SessionData';

const protectedServerSideProps =
  <PropsT>(
    allowedRoles: Array<UserRole>,
    getPropsFn?: (
      context: GetServerSidePropsContext,
      sessionData: SessionData
    ) => Promise<PropsT>
  ) =>
  async (context: GetServerSidePropsContext) => {
    let accessAllowed = false;
    let sessionData: SessionData | null = null;
    try {
      sessionData = (await verifySessionData(context.req)) as SessionData;
      accessAllowed = verifyAuthority(sessionData, allowedRoles);
    } catch {
      return {
        props: {
          authDataConsistency: 'error',
        },
      };
    }
    if (!accessAllowed) {
      return {
        redirect: {
          authDataConsistency: 'ok',
          destination: '/404',
          permanent: false,
        },
      };
    }
    if (!getPropsFn) {
      return {
        props: {
          authDataConsistency: 'ok',
        },
      };
    }
    try {
      const serverSideProps = await getPropsFn(context, sessionData);
      return {
        props: {
          authDataConsistency: 'ok',
          ...serverSideProps,
        },
      };
    } catch (error) {
      let authExpired = false;
      if (error instanceof Error && error.message === 'Unauthorized') {
        authExpired = true;
      }
      return {
        redirect: {
          authDataConsistency: authExpired ? 'error' : 'ok',
          destination: '/404',
          permanent: false,
        },
      };
    }
  };
export default protectedServerSideProps;

export const protectedSsr =
  <TProps>(options: {
    allowedRoles: Array<UserRole>;
    redirect: {
      destination: string;
      permanent: boolean;
    };
  }) =>
  (
    getServerSidePropsFn?: (context: GetServerSidePropsContext) => Promise<
      | {
          props: TProps;
        }
      | {
          redirect: {
            destination: string;
            permanent?: boolean;
          };
        }
    >
  ) => {
    return async function protectedServerSidePropsCreator(
      context: GetServerSidePropsContext
    ) {
      const session = {};
      const sessionStatusVerified = true; // TODO: verify session status

      if (!sessionStatusVerified) {
        return {
          redirect: options.redirect,
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

      return {
        props: {
          session,
          ...otherProps.props,
        },
      };
    };
  };
