type Headers = {
  [key: string]: string;
};

export const retrieveErrorMessage = (responseData: any) => {
  if (responseData.message) {
    return responseData.message;
  }
  if (responseData.detail) {
    return responseData.detail;
  }
  if (responseData.exceptionDetails && responseData.exceptionDetails.message) {
    return responseData.exceptionDetails.message;
  }
  if (responseData.title) {
    return responseData.title;
  }
  return 'Невідома помилка';
};

export const serverUrl = process.env.BACKEND_SERVER_URL;
export const baseURL = `${serverUrl}/api/`;
export const defaultTimeout = 10000;
export const defaultTimeoutErrorMessage = 'Сервер мовчить';
export const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};
export const defaultAxiosConfig = {
  baseURL,
  timeout: defaultTimeout,
  timeoutErrorMessage: defaultTimeoutErrorMessage,
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
