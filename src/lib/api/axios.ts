import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { backendApiBaseUrl } from '.';

const defaultHeaders = { 'Content-Type': 'application/json' };

const client = axios.create({
  baseURL: backendApiBaseUrl,
  headers: defaultHeaders,
});
export default client;

export const retrieveAxiosErrorMessage = (err: AxiosError<any>) => {
  return err.response?.data?.detail || err.message || 'Невідома помилка';
};

type AxiosResponseCallbackFn<TData = any, TResult = any> = (
  response: ValueOf<AxiosResponse<TData>>
) => TResult;

type ExtendedAxiosRequestOptions<TData, TConfig, TSelected> =
  AxiosRequestConfig<TConfig> & {
    select?: AxiosResponseCallbackFn<TData, TSelected>;
  };

export const request = async <TData = any, TConfig = any, TSelected = TData>({
  select = (response) => response.data,
  ...options
}: ExtendedAxiosRequestOptions<TData, TConfig, TSelected>) => {
  const onSuccess = (response: AxiosResponse<TData, TConfig>) => {
    return select(response);
  };

  const onError = (err: AxiosError<TData, TConfig>) => {
    const msg = retrieveAxiosErrorMessage(err);
    return Promise.reject(msg);
  };
  return client(options).then(onSuccess).catch(onError);
};
