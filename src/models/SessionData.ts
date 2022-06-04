import UserRole from './enums/UserRole';

interface SessionData {
  role: UserRole;
  authorityToken: string;
  accessToken: string;
  selfId: string;
  entityId?: string;
}
export default SessionData;
