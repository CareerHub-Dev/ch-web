import UserRole from '@/models/enums/UserRole';
import { type GetServerSidePropsContext } from 'next/types';
import verifyAuthority from './api/local/helpers/verify-authority';
import verifySessionData from './api/local/helpers/verify-session-data';

const withVerification =
  <PropsT>(
    getPropsFn: (context: GetServerSidePropsContext) => PropsT,
    allowedRoles: Array<UserRole>
  ) =>
  async (context: GetServerSidePropsContext) => {
    let accessAllowed = false;
    try {
      const sessionData = await verifySessionData(context.req);
      accessAllowed = verifyAuthority(sessionData, allowedRoles);
    } catch {
      accessAllowed = false;
    }
    if (!accessAllowed) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }
    return getPropsFn(context);
  };
export default withVerification;
