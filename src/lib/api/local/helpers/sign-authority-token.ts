import UserRole from '@/lib/enums/UserRole';
import jwt from 'jsonwebtoken';

/**
 * Sings the authority token,
 * which is used to determine the user's `role`
 * @param role - the role to sign token from
 * @returns signed authority token, containing the role
 */
const signAuthorityToken = (role: UserRole) => {
  const payload = {
    role,
  };
  const token = jwt.sign(payload, String(process.env.JWT_SECRET));
  return token;
};
export default signAuthorityToken;
