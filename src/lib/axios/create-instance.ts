import axios from "axios";
import { backendApiBaseUrl } from "../api";
import {
  setupJwtInterceptor,
  setupRefreshTokenInterceptor,
} from "./interceptors";
import { Mutex } from "async-mutex";
import { SessionData } from "../schemas/SessionData";
import { LocalGateway } from "../api/account";

const mutex = new Mutex();

export default function createAxiosInstance({
  data,
  refreshToken,
}: {
  data?: SessionData | null;
  refreshToken?: () => Promise<SessionData>;
}) {
  const instance = axios.create({
    baseURL: backendApiBaseUrl,
    headers: { "Content-Type": "application/json" },
  });

  if (data) {
    const refresh =
      refreshToken ??
      (async () => LocalGateway.refreshToken(data.refreshToken));

    setupJwtInterceptor({ instance, jwt: data.jwtToken });
    setupRefreshTokenInterceptor({
      instance,
      onRefresh: async () => {
        if (mutex.isLocked()) {
          await mutex.waitForUnlock();
          return;
        }
        const release = await mutex.acquire();
        const refreshedData = await refresh();
        instance.interceptors.request.eject(0);
        setupJwtInterceptor({ instance, jwt: refreshedData.jwtToken });
        release();
      },
    });
  }
  return instance;
}
