import axios, { AxiosError, AxiosResponse } from 'axios';
import { z } from 'zod';
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

const requestErrorHandler = (err: unknown) => {
  let msg = 'Невідома помилка запиту';
  if (err instanceof AxiosError) {
    msg = retrieveAxiosErrorMessage(err);
  } else if (err instanceof Error) {
    msg = err.message;
  }
  return Promise.reject(msg);
};

export const request = async <TSelected = any>({
  instance = axiosInstance,
  prefix,
  select = (response) => response.data,
  method = 'GET',
  ...options
}: ExtendedAxiosRequestOptions<TSelected>): Promise<TSelected> => {
  if (prefix) {
    options.url = `${prefix}/${options.url}`;
  }
  return instance({ method, ...options })
    .then(select)
    .catch(requestErrorHandler);
};

export const requestAsync = async <TSelected = any>({
  instance = axiosInstance,
  prefix,
  select = (response) => response.data,
  method = 'GET',
  ...options
}: ExtendedAxiosRequestOptions<Promise<TSelected>>): Promise<TSelected> => {
  if (prefix) {
    options.url = `${prefix}/${options.url}`;
  }
  return instance({ method, ...options })
    .then(select)
    .catch(requestErrorHandler);
};
