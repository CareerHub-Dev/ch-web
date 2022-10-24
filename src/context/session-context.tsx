import { useQuery, useMutation } from '@tanstack/react-query';
import { LocalGateway } from '@/lib/api/account';
import { type SessionData } from '@/lib/schemas/SessionData';
import { createContext, ReactNode, useState } from 'react';

type SessionContextData = {
  status: 'loading' | 'authenticated' | 'unauthenticated';
  data: SessionData | null;
  logout: () => void;
  login: (session: SessionData) => void;
};

const SessionContext = createContext<SessionContextData>({
  data: null,
  status: 'loading',
  logout: () => {},
  login: () => {},
});
export default SessionContext;

export const SessionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [data, setData] = useState<SessionData | null>(null);
  const [status, setStatus] = useState<
    'loading' | 'authenticated' | 'unauthenticated'
  >('loading');
  useQuery(['session'], LocalGateway.getMe, {
    onError(_) {
      setData(null);
      setStatus('unauthenticated');
    },
    onSuccess(data) {
      setData(data);
      setStatus('authenticated');
    },
    retry: false,
  });
  
  const logoutMutation = useMutation(LocalGateway.logout, {
    onSuccess() {
      setData(null);
      setStatus('unauthenticated');
    },
  });

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const login = (session: SessionData) => {
    setData(session);
    setStatus('authenticated');
  };

  const contextValue = {
    data,
    status,
    logout,
    login,
  } as SessionContextData;

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
