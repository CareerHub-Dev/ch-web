import { GetServerSidePropsContext } from 'next';
import jwt from 'jwt-promisify';
import AuthorizationError from '../../../../models/errors/AuthorizationError';
import UserRole from '@/lib/enums/UserRole';

/**
 * Parses session data from the server-side context,
 * @param request - a `req` property from `NextApiRequest`
 * @return an object containing the session data
 * @throws `AuthorizationError` if the authority data is inconsistent (e.g. some of the required fields are missing)
 */
const verifySessionData = async (request: GetServerSidePropsContext['req']) => {
  const authorityCookie = request.cookies['ch-http'];
  if (!authorityCookie) {
    throw new AuthorizationError('Не вдалося отримати дані авторизації');
  }
  const parsedSessionDataObj = JSON.parse(authorityCookie);
  if (
    !parsedSessionDataObj ||
    !parsedSessionDataObj.authorityToken ||
    !parsedSessionDataObj.accountId ||
    !parsedSessionDataObj.accessToken
  ) {
    throw new AuthorizationError('Не вдалося отримати дані авторизації');
  }
  const decoded = await jwt.verify(
    parsedSessionDataObj.authorityToken,
    String(process.env.JWT_SECRET)
  );
  const sessionData = {
    role: decoded.role as UserRole,
    accountId: parsedSessionDataObj.accountId,
  };

  return sessionData;
};
export default verifySessionData;
