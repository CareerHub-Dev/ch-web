import RequestStatus from '@/model/enums/RequestStatus';
import axios from 'axios';

type Headers = {
  [key: string]: string;
};

export const serverUrl = 'https://careerhubv2.azurewebsites.net';
export const baseURL = `${serverUrl}/api/`;
export const defaultTimeout = 10000;
export const defaultTimeoutErrorMessage = 'Сервер мовчить';
export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
};
export const defaultAxiosConfig = {
  baseURL,
  timeout: defaultTimeout,
  timeoutErrorMessage: defaultTimeoutErrorMessage,
  withCredentials: true,
  headers: defaultHeaders,
};

export const getAccessTokenFromLocalStorage = () => {
  if (typeof localStorage === 'undefined') {
    throw new Error('LocalStorage is not supported');
  }

  const accessToken = localStorage.getItem('accessToken');
  const accessTokenIsValid = accessToken && accessToken.length > 0;
  if (accessTokenIsValid) {
    return accessToken;
  }
  throw new Error('Access token was not found in localStorage');
};

export const getRequestHeadersWithAccessToken = () => {
  const headers = defaultHeaders as Headers;
  try {
    const accessToken = getAccessTokenFromLocalStorage();
    headers['Authorization'] = `Bearer ${accessToken}`;
  } catch {
    // do nothing
  }
  return { headers };
};

const gateway = axios.create(defaultAxiosConfig);
export default gateway;
