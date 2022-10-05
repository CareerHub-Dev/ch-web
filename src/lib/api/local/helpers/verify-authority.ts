import UserRole from '@/lib/enums/UserRole';
import SessionData from '@/lib/models/SessionData';

/**
 * Verifies the authority token,
 * @param sessionData - an object containing the current session's data
 * @return if session role is in the allowed to access
 */
const verifyAuthority = (
  sessionData: SessionData,
  rolesAllowed: Array<UserRole>
) => {
  return rolesAllowed.includes(sessionData.role);
};
export default verifyAuthority;
