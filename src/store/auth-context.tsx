import UserRole from '@/model/enums/UserRole';
import React, { useState, useEffect, useCallback } from 'react';

type AuthContextData = {
  token: string | null;
  role: UserRole | null;
  isLoggedIn: boolean;
  login: (token: string, role: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextData>({
  token: null,
  role: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const retrieveTokenFromLocalStorage = () => {
  if (typeof localStorage === 'undefined') {
    return null;
  }
  const storedToken = localStorage.getItem('accessToken');
  return storedToken;
};

const matchRole = (role: string) => {
  const upperCaseRole = role.toUpperCase();
  switch (upperCaseRole) {
    case 'STUDENT':
      return UserRole.Student;
    case 'COMPANY':
      return UserRole.Company;
    default:
      return null;
  }
};

export const AuthContextProvider: React.FC = ({ children }) => {
  const storedToken = retrieveTokenFromLocalStorage();
  const [token, setToken] = useState(storedToken);
  const [role, setRole] = useState<UserRole | null>(null);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setRole(null);
    setToken(null);
    localStorage.removeItem('accessToken');
  }, []);

  const loginHandler = (token: string, role: string) => {
    const matchedRole = matchRole(role);
    if (!matchedRole) {
      throw new Error('Ви не можете авторизуватися на цьому сайті');
    }
    setRole(matchedRole);
    setToken(token);
    localStorage.setItem('accessToken', token);
  };

  const contextValue = {
    token: token,
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
