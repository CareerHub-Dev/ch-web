import UserRole from '@/models/enums/UserRole';
import { GetServerSidePropsContext } from 'next';
import jwt from 'jwt-promisify';
import AuthorizationError from '../../../../models/errors/AuthorizationError';
import SessionData from '@/models/SessionData';

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
  const sessionData: SessionData = {
    role: decoded.role as UserRole,
    authorityToken: parsedSessionDataObj.authorityToken,
    accessToken: parsedSessionDataObj.accessToken,
    accountId: parsedSessionDataObj.accountId,
  };

  return sessionData;
};
export default verifySessionData;
