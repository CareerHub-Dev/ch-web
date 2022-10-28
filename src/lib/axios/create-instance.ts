import axios from 'axios';
import { backendApiBaseUrl } from '../api';
import {
  setupJwtInterceptor,
  setupRefreshTokenInterceptor,
} from './interceptors';
import { SessionData } from '../schemas/SessionData';
import { LocalGateway } from '../api/account';

export default function createAxiosInstance({
  data,
  refreshToken,
}: {
  data?: SessionData | null;
  refreshToken?: () => Promise<SessionData>;
}) {
  const instance = axios.create({
    baseURL: backendApiBaseUrl,
    headers: { 'Content-Type': 'application/json' },
  });

  if (data) {
    const refresh =
      refreshToken ??
      (async () => await LocalGateway.refreshToken(data.refreshToken));

    setupJwtInterceptor({ instance, jwt: data.jwtToken });
    setupRefreshTokenInterceptor({
      instance,
      onRefresh: async () => {
        const refrshedData = await refresh();
        instance.interceptors.request.eject(0);
        setupJwtInterceptor({ instance, jwt: refrshedData.jwtToken });
      },
    });
  }
  return instance;
}
