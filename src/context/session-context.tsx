import { useQuery, useMutation } from '@tanstack/react-query';
import { LocalGateway } from '@/lib/api/account';
import { type SessionData } from '@/lib/schemas/SessionData';
import { createContext, ReactNode, useReducer } from 'react';
import createAxiosInstance from '@/lib/axios/create-instance';
import axios, { type AxiosInstance } from 'axios';

type SessionContextState =
  | {
      status: 'loading' | 'unauthenticated';
      data: null;
    }
  | {
      status: 'authenticated';
      data: SessionData;
    };

type SessionContextAction =
  | { type: 'UPDATE'; data: SessionData }
  | { type: 'RESET' };

type SessionContextData = SessionContextState & {
  axios: AxiosInstance;
  logout: () => void;
  login: (session: SessionData) => void;
  refreshToken: () => void;
  refreshTokenAsync: () => Promise<SessionData>;
};

const sessionContextInitialState: SessionContextState = {
  status: 'loading',
  data: null,
};

const SessionContext = createContext<SessionContextData>({
  ...sessionContextInitialState,
  axios: axios.create(),
  logout: () => {},
  login: () => {},
  refreshToken: () => {},
  refreshTokenAsync: () => new Promise(() => {}),
});
export default SessionContext;

const sessionStateReducer = (
  state: SessionContextState,
  action: SessionContextAction
): SessionContextState => {
  if (action.type === 'UPDATE') {
    return {
      status: 'authenticated',
      data: action.data,
    };
  }
  if (action.type === 'RESET') {
    return {
      status: 'unauthenticated',
      data: null,
    };
  }
  return sessionContextInitialState;
};

export const SessionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    sessionStateReducer,
    sessionContextInitialState
  );

  useQuery(['session'], LocalGateway.getMe, {
    onError() {
      dispatch({ type: 'RESET' });
    },
    onSuccess(data) {
      dispatch({ type: 'UPDATE', data });
    },
    retry: false,
  });

  const logoutMutation = useMutation(LocalGateway.logout, {
    onSuccess() {
      dispatch({ type: 'RESET' });
    },
  });

  const refreshTokenMutation = useMutation(LocalGateway.refreshToken, {
    onSuccess(data) {
      dispatch({ type: 'UPDATE', data });
    },
    onError() {
      dispatch({ type: 'RESET' });
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  const refreshToken = () => {
    if (state.data?.refreshToken) {
      refreshTokenMutation.mutate(state.data.refreshToken);
    }
  };

  const refreshTokenAsync = () => {
    return refreshTokenMutation.mutateAsync(state.data?.refreshToken ?? '');
  };

  const login = (data: SessionData) => {
    dispatch({ type: 'UPDATE', data });
  };

  const instance = createAxiosInstance({
    data: state.data,
    refreshToken: refreshTokenAsync,
  });

  const contextValue: SessionContextData = {
    ...state,
    axios: instance,
    logout,
    login,
    refreshToken,
    refreshTokenAsync,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
