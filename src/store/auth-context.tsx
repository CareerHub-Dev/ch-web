import UserRole from '@/models/enums/UserRole';
import Router, { useRouter } from 'next/router';
import React, { useState, useCallback } from 'react';

type AuthContextData = {
  accessToken: string | null;
  authorityToken: string | null;
  accountId: string | null;
  role: UserRole | null;
  isLoggedIn: boolean;
  login: (
    accessToken: string,
    authorityToken: string,
    accountId: string,
    role: string
  ) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextData>({
  accessToken: null,
  accountId: null,
  authorityToken: null,
  role: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const retrieveItemFromLocalStorage = (key: string) => {
  if (typeof localStorage === 'undefined') {
    return null;
  }
  const storedToken = localStorage.getItem(key);
  return storedToken;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const storedAccessToken = retrieveItemFromLocalStorage('ch-accessToken');
  const storedAuthorityToken =
    retrieveItemFromLocalStorage('ch-authorityToken');
  const storedAccountId = retrieveItemFromLocalStorage('ch-accountId');
  const storedRole = retrieveItemFromLocalStorage('ch-role');

  const [accessToken, setAccessToken] = useState(storedAccessToken);
  const [authorityToken, setAuthorityToken] = useState(storedAuthorityToken);
  const [accountId, setAccountId] = useState(storedAccountId);
  const [role, setRole] = useState<UserRole | null>(
    storedRole as UserRole | null
  );
  const userIsLoggedIn = !!accessToken && !!authorityToken;

  const logoutHandler = useCallback(() => {
    setAccessToken(null);
    setAuthorityToken(null);
    setAccountId(null);
    setRole(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('ch-accessToken');
      localStorage.removeItem('ch-authorityToken');
      localStorage.removeItem('ch-accountId');
      localStorage.removeItem('ch-role');
    }
    fetch('/api/auth/signout', { method: 'POST' });
    router.replace('/');
  }, [router]);

  const loginHandler = (
    accessToken: string,
    authorityToken: string,
    accountId: string,
    role: UserRole
  ) => {
    setRole(role);
    setAccessToken(accessToken);
    setAccountId(accountId);
    setAuthorityToken(authorityToken);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ch-accessToken', accessToken);
      localStorage.setItem('ch-accountId', accountId);
      localStorage.setItem('ch-authorityToken', authorityToken);
      localStorage.setItem('ch-role', role);
    }
  };

  const contextValue = {
    accessToken,
    authorityToken,
    accountId,
    role,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  } as AuthContextData;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
