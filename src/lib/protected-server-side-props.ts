import UserRole from '@/models/enums/UserRole';
import SessionData from '@/models/SessionData';
import { type GetServerSidePropsContext } from 'next/types';
import verifyAuthority from './api/local/helpers/verify-authority';
import verifySessionData from './api/local/helpers/verify-session-data';

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
      sessionData = await verifySessionData(context.req);
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
