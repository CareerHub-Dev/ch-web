import { AxiosResponse } from 'axios';
import useAuth from './useAuth';
import gateway from '@/lib/api';

interface RefreshTokenResponse {
  jwtToken: string;
  role: string;
}

const useRefreshToken = () => {
  const auth = useAuth();

  const refresh = async () => {
    const response = await gateway.post<
      any,
      AxiosResponse<RefreshTokenResponse>
    >(
      'Accounts/refresh-token-web',
      {
        token: null,
      },
      {
        withCredentials: true,
      }
    );
    console.log(response);
    auth.login(response.data.jwtToken, response.data.role);
    return response.data.jwtToken;
  };
  return refresh;
};

export default useRefreshToken;
