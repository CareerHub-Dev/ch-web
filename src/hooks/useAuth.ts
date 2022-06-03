import { useContext } from 'react';
import AuthContext from '@/store/auth-context';
import { sendRefreshTokenRequest } from '@/lib/api/auth';
import RequestStatus from '@/model/enums/RequestStatus';

const useAuth = () => {
  const auth = useContext(AuthContext);

  const refreshHandler = () => {
    sendRefreshTokenRequest((response) => {
      switch (response.status) {
        case RequestStatus.Success:
          const { jwtToken, role } = response.data;
          auth.login(jwtToken, role);
          break;
        default:
          auth.logout();
          break;
      }
    });
  };

  if (auth.isLoggedIn && !auth.role) {
    console.log('refreshing');
    refreshHandler();
  }

  return auth;
};
export default useAuth;
