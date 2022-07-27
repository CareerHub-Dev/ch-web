import UserRole from '@/models/enums/UserRole';
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

export const AuthContextProvider: React.FC = ({ children }) => {
  const storedAccessToken = retrieveItemFromLocalStorage('ch-accessToken');
  const storedAuthorityToken =
    retrieveItemFromLocalStorage('ch-authorityToken');
  const storedAccountId = retrieveItemFromLocalStorage('ch-accountId');

  const [accessToken, setAccessToken] = useState(storedAccessToken);
  const [authorityToken, setAuthorityToken] = useState(storedAuthorityToken);
  const [accountId, setAccountId] = useState(storedAccountId);
  const [role, setRole] = useState<UserRole | null>(null);
  const userIsLoggedIn = !!accessToken && !!authorityToken;

  const logoutHandler = useCallback(() => {
    setAccessToken(null);
    setAuthorityToken(null);
    setAccountId(null);
    setRole(null);
    localStorage.removeItem('ch-accessToken');
    localStorage.removeItem('ch-authorityToken');
    fetch('/api/auth/signout', { method: 'POST' }).then((response) => {
      if (!response.ok) {
        console.error('Error while signing out');
      }
    });
  }, []);

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
    localStorage.setItem('ch-accessToken', accessToken);
    localStorage.setItem('ch-acccountId', accountId);
    localStorage.setItem('ch-authorityToken', authorityToken);
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
