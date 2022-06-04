import UserRole from '@/model/enums/UserRole';
import { GetServerSidePropsContext } from 'next';
import jwt from 'jwt-promisify';

/**
 * Verifies the authority token,
 * @param request - a `req` property from `NextApiRequest`
 * @return the token validation result
 */
const verifyAuthority = async (
  request: GetServerSidePropsContext['req'],
  rolesAllowed: Array<UserRole>
) => {
  const authorityCookie = request.cookies['ch-authority'];
  const parsedAuthorityObj = JSON.parse(authorityCookie);
  if (!parsedAuthorityObj || !parsedAuthorityObj.token) {
    return false;
  }
  const decoded = await jwt.verify(
    parsedAuthorityObj.token,
    String(process.env.JWT_SECRET)
  );

  return rolesAllowed.includes(decoded.role as UserRole);
};
export default verifyAuthority;
