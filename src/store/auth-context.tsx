import UserRole from '@/model/enums/UserRole';
import React, { useState, useCallback } from 'react';

type AuthContextData = {
  accessToken: string | null;
  authorityToken: string | null;
  role: UserRole | null;
  isLoggedIn: boolean;
  login: (accessToken: string, authorityToken: string, role: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextData>({
  accessToken: null,
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

  const [accessToken, setAccessToken] = useState(storedAccessToken);
  const [authorityToken, setAuthorityToken] = useState(storedAuthorityToken);

  const [role, setRole] = useState<UserRole | null>(null);
  const userIsLoggedIn = !!accessToken && !!authorityToken;

  const logoutHandler = useCallback(() => {
    setAccessToken(null);
    setAuthorityToken(null);
    setRole(null);
    localStorage.removeItem('ch-accessToken');
    localStorage.removeItem('ch-authorityToken');
  }, []);

  const loginHandler = (
    accessToken: string,
    authorityToken: string,
    role: UserRole
  ) => {
    setRole(role);
    setAccessToken(accessToken);
    setAuthorityToken(authorityToken);
    localStorage.setItem('ch-accessToken', accessToken);
    localStorage.setItem('ch-authorityToken', authorityToken);
  };

  const contextValue = {
    accessToken: accessToken,
    authorityToken: authorityToken,
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
