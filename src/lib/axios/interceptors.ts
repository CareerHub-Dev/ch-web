import { type AxiosInstance } from 'axios';

export function setupJwtInterceptor({
  instance,
  jwt,
}: {
  instance: AxiosInstance;
  jwt: string;
}) {
  instance.interceptors.request.use(
    (config) => {
      if (jwt) {
        config.headers!['Authorization'] = `Bearer ${jwt}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export function setupRefreshTokenInterceptor({
  instance,
  onRefresh,
}: {
  instance: AxiosInstance;
  onRefresh: () => any;
}) {
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const refreshed = onRefresh();
            if (refreshed instanceof Promise) {
              await refreshed;
            }
            return instance(originalConfig);
          } catch (error) {
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
}
