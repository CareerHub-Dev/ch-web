import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

type AuthContextData = {
  accessToken: string | null;
  sessionData: any;
  isLoggedIn: boolean;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextData>({
  accessToken: null,
  sessionData: null,
  isLoggedIn: false,
  logout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [cookies, _setCookie, removeCookie] = useCookies(['ch-client']);
  const clientCookie = cookies['ch-client'];
  const accessToken = clientCookie?.accessToken || null;

  const logoutHandler = () => {
    removeCookie('ch-client');
    router.replace('/');
  };

  const contextValue = {
    accessToken: accessToken,
    sessionData: clientCookie,
    isLoggedIn: !!clientCookie,
    logout: logoutHandler,
  } as AuthContextData;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
