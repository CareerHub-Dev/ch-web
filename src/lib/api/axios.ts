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

export const request = async <TData = any, TConfig = any>(
  options: AxiosRequestConfig<TConfig>
) => {
  const onSuccess = (response: AxiosResponse<TData, TConfig>) => {
    return response.data;
  };

  const onError = (err: AxiosError<TData, TConfig>) => {
    const msg = retrieveAxiosErrorMessage(err);
    return Promise.reject(msg);
  };
  return client(options).then(onSuccess).catch(onError);
};
