import UserRole from '@/model/enums/UserRole';
import { GetServerSidePropsContext } from 'next';
import jwt from 'jwt-promisify';

const verifyAuthority = async (
  request: GetServerSidePropsContext['req'],
  rolesAllowed: Array<UserRole>
) => {
  const authorityToken = request.cookies['ch-authority'];
  if (!authorityToken) {
    return false;
  }
  const decoded = await jwt.verify(
    authorityToken,
    String(process.env.JWT_SECRET)
  );

  return rolesAllowed.includes(decoded.role as UserRole);
};
export default verifyAuthority;
