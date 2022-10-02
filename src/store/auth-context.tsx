import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

type AuthContextData = {
  accessToken: string | null;
  sessionData: any;
  isLoggedIn: boolean;
  login: (data: any) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextData>({
  accessToken: null,
  sessionData: null,
  isLoggedIn: false,
  login: (_) => {},
  logout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['ch-client']);
  const clientCookie = cookies['ch-client'];
  const accessToken = clientCookie?.accessToken || null;

  const logoutHandler = () => {
    removeCookie('ch-client');
    router.replace('/');
  };

  const loginHandler = (data: any) => {
    setCookie('ch-client', data.clientCookie, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  };

  const contextValue = {
    accessToken: accessToken,
    sessionData: clientCookie,
    isLoggedIn: !!clientCookie,
    login: loginHandler,
    logout: logoutHandler,
  } as AuthContextData;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
