import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { backendApiBaseUrl, localGatewayUrl } from '.';

const defaultHeaders = { 'Content-Type': 'application/json' };

const axiosInstance = axios.create({
  baseURL: backendApiBaseUrl,
  headers: defaultHeaders,
});
export default axiosInstance;

export const localGatewayAxiosInstance = axios.create({
  baseURL: localGatewayUrl,
  headers: defaultHeaders,
});

export const retrieveAxiosErrorMessage = (err: AxiosError<any>) => {
  return (
    err.response?.data?.detail ||
    err.response?.data?.message ||
    err.message ||
    'Невідома помилка'
  );
};

export type AxiosResponseCallbackFn<TData = any, TResult = any> = (
  response: ValueOf<AxiosResponse<TData>>
) => TResult;

export type ExtendedAxiosRequestOptions<TData, TConfig, TSelected> =
  AxiosRequestConfig<TConfig> & {
    select?: AxiosResponseCallbackFn<TData, TSelected>;
  };

export const request = async <TData = any, TConfig = any, TSelected = TData>({
  select = (response) => response.data,
  ...options
}: ExtendedAxiosRequestOptions<TData, TConfig, TSelected>) => {
  const onError = (err: AxiosError<TData, TConfig>) => {
    const msg = retrieveAxiosErrorMessage(err);
    return Promise.reject(msg);
  };
  return axiosInstance(options).then(select).catch(onError);
};
