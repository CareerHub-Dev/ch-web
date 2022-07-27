import UserRole from './enums/UserRole';

interface SessionData {
  role: UserRole;
  authorityToken: string;
  accessToken: string;
  accountId: string;
}
export default SessionData;
