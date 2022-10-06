import type { AxiosResponse, AxiosRequestConfig } from 'axios';

declare global {
  type AxiosResponseCallbackFn<TData = any, TResult = any> = (
    response: ValueOf<AxiosResponse<TData>>
  ) => TResult;

  type ExtendedAxiosRequestOptions<TData, TConfig, TSelected> =
    AxiosRequestConfig<TConfig> & {
      select?: AxiosResponseCallbackFn<TData, TSelected>;
      instance?: AxiosInstance;
      prefix?: string;
    };
}
