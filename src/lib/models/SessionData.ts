import UserRole from '../enums/UserRole';

type SessionData = Omit<RawSessionData, 'role'> & { role: UserRole };
export default SessionData;
