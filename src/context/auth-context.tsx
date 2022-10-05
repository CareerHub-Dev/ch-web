import { useRouter } from 'next/router';
import { createContext, type ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import SessionDataSchema, { type SessionData } from '@/lib/schemas/SessionData';

type AuthContextData = {
  session: SessionData | null;
  isLoggedIn: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData>({
  session: null,
  isLoggedIn: false,
  logout: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [cookies, _setCookie, removeCookie] = useCookies(['ch-client']);
  const clientCookie = cookies['ch-client'];
  const parsedSession = SessionDataSchema.safeParse(clientCookie);
  const session = parsedSession.success ? parsedSession.data : null;

  const logoutHandler = () => {
    removeCookie('ch-client');
    router.replace('/');
  };

  const contextValue = {
    session,
    isLoggedIn: !!session,
    logout: logoutHandler,
  } as AuthContextData;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
