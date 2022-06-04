import { useRouter } from 'next/router';
import { useContext } from 'react';
import AuthContext from '@/store/auth-context';
import { sendRefreshTokenRequest } from '@/lib/api/auth';
import RequestStatus from '@/model/enums/RequestStatus';

const useAuth = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const refreshHandler = () => {
    sendRefreshTokenRequest((response) => {
      switch (response.status) {
        case RequestStatus.Success:
          const { jwtToken, role } = response.data;
          auth.login(jwtToken, role);
          break;
        default:
          auth.logout();
          router.push('/auth/login');
          break;
      }
    });
  };

  if (typeof window !== 'undefined' && auth.isLoggedIn && !auth.role) {
    console.log('refreshing');
    refreshHandler();
  }

  return auth;
};
export default useAuth;
