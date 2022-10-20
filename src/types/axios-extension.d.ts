import type { AxiosResponse, AxiosRequestConfig } from 'axios';

declare global {
  type AxiosResponseCallbackFn<TResult> = (
    response: AxiosResponse<any>
  ) => TResult;

  type ExtendedAxiosRequestOptions<TConfig, TSelected> =
    AxiosRequestConfig<TConfig> & {
      instance?: AxiosInstance;
      prefix?: string;
      select?: AxiosResponseCallbackFn<TSelected>;
    };
}
