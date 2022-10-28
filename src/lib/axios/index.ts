import axios, { AxiosError } from 'axios';
import { backendApiBaseUrl, localGatewayUrl } from '../api';

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

const requestErrorHandler = (err: unknown) => {
  let msg = 'Невідома помилка запиту';
  if (err instanceof AxiosError) {
    msg = retrieveAxiosErrorMessage(err);
  } else if (err instanceof Error) {
    msg = err.message;
  }
  return Promise.reject(msg);
};

export async function request<TSelected = any>(
  options: ExtendedAxiosRequestOptions<Promise<TSelected>>
): Promise<TSelected>;
export async function request<TSelected = any>(
  options: ExtendedAxiosRequestOptions<TSelected>
): Promise<TSelected>;
export async function request<TSelected = any>({
  instance = axiosInstance,
  prefix,
  select = (response) => response.data,
  method = 'GET',
  ...options
}: ExtendedAxiosRequestOptions<
  TSelected | Promise<TSelected>
>): Promise<TSelected> {
  if (prefix) {
    options.url = `${prefix}/${options.url}`;
  }
  return instance({ method, ...options })
    .then(select)
    .catch(requestErrorHandler);
}
