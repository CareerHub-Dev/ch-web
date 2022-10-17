import { createContext, type ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import SessionDataSchema, { type SessionData } from '@/lib/schemas/SessionData';

type AuthContextData = {
  session: SessionData | null;
  isLoggedIn: boolean;
  logout: () => void;
  login: (session: SessionData) => void;
};

const AuthContext = createContext<AuthContextData>({
  session: null,
  isLoggedIn: false,
  logout: () => {},
  login: () => {},
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['ch-client']);
  const clientCookie = cookies['ch-client'];
  const parsedSession = SessionDataSchema.safeParse(clientCookie);
  const session = parsedSession.success ? parsedSession.data : null;

  const logoutHandler = () => {
    removeCookie('ch-client');
  };

  const loginHandler = (session: SessionData) => {
    setCookie('ch-client', session, {
      path: '/',
      expires: new Date(session.jwtTokenExpires),
      sameSite: true,
    });
  };

  const contextValue = {
    session,
    isLoggedIn: !!session,
    logout: logoutHandler,
    login: loginHandler,
  } as AuthContextData;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
