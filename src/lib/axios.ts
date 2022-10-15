import axios, { AxiosError } from 'axios';
import { backendApiBaseUrl, localGatewayUrl } from './api';

const defaultHeaders = { 'Content-Type': 'application/json' };

export const localGatewayAxiosInstance = axios.create({
  baseURL: localGatewayUrl,
  headers: defaultHeaders,
});

const axiosInstance = axios.create({
  baseURL: backendApiBaseUrl,
  headers: defaultHeaders,
});
export default axiosInstance;

export const retrieveAxiosErrorMessage = (err: AxiosError<any>) => {
  return (
    err.response?.data?.detail ||
    err.response?.data?.message ||
    err.message ||
    'Невідома помилка'
  );
};

const requestErrorHandler = <TData, TConfig>(
  err: AxiosError<TData, TConfig>
) => {
  const msg = retrieveAxiosErrorMessage(err);
  return Promise.reject(msg);
};

export const request = async <TData = any, TConfig = any, TSelected = TData>({
  instance = axiosInstance,
  prefix,
  select = (response) => response.data,
  method = 'GET',
  ...options
}: ExtendedAxiosRequestOptions<TData, TConfig, TSelected>) => {
  if (prefix) {
    options.url = `${prefix}/${options.url}`;
  }

  return instance({ method, ...options })
    .then(select)
    .catch(requestErrorHandler);
};
