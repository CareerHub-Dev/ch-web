import UserRole from '@/model/enums/UserRole';
import React, { useState, useEffect, useCallback, ReactNode } from 'react';

let logoutTimer: any;

type AuthContextData = {
  token: string | null;
  role: UserRole | null;
  isLoggedIn: boolean;
  login: (token: string, expirationTime: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextData>({
  token: null,
  role: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime: string | null) => {
  if (expirationTime === null) {
    return 0;
  }
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const retrieveTokenFromLocalStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const storedToken = localStorage.getItem('accessToken');
  const storedExpirationDate = localStorage.getItem('expirationTime');
  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider: React.FC = ({ children }) => {
  const tokenData = retrieveTokenFromLocalStorage();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token: string, expirationTime: string) => {
    setToken(token);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('expirationTime', expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  } as AuthContextData;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
