import type {
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosProxyConfig,
} from 'axios';
import type { ZodSchema } from 'zod';

declare global {
  type AxiosResponseCallbackFn<TResult> = (response: AxiosResponse) => TResult;

  type ExtendedAxiosRequestOptions<TSelected> = AxiosRequestConfig & {
    instance?: AxiosInstance;
    prefix?: string;
    select?: AxiosResponseCallbackFn<TSelected>;
  };
}
