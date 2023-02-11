import { useQuery, useMutation } from '@tanstack/react-query';
import { LocalGateway } from '@/lib/api/account';
import { type SessionData } from '@/lib/schemas/SessionData';
import { createContext, ReactNode, useReducer } from 'react';
import createAxiosInstance from '@/lib/axios/create-instance';
import axios, { type AxiosInstance } from 'axios';

type SessionContextState =
  | { status: 'unauthenticated'; data: null }
  | {
      status: 'loading';
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

export const SessionContext = createContext<SessionContextData>({
  ...sessionContextInitialState,
  axios: axios.create(),
  logout: () => {},
  login: () => {},
  refreshToken: () => {},
  refreshTokenAsync: () => new Promise(() => {}),
});

const sessionStateReducer = (
  state: SessionContextState,
  action: SessionContextAction
): SessionContextState => {
  switch (action.type) {
    case 'UPDATE':
      return {
        status: 'authenticated',
        data: action.data,
      };
    case 'RESET':
      return {
        status: 'unauthenticated',
        data: null,
      };
    default:
      return { ...state };
  }
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

  useQuery({
    queryKey: ['session'],
    queryFn: LocalGateway.getMe,
    onError() {
      dispatch({ type: 'RESET' });
    },
    onSuccess(data) {
      dispatch({ type: 'UPDATE', data });
    },
    retry: false,
  });

  const logoutMutation = useMutation({
    mutationFn: LocalGateway.logout,
    onSuccess() {
      dispatch({ type: 'RESET' });
    },
  });

  const refreshTokenMutation = useMutation({
    mutationFn: LocalGateway.refreshToken,
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
