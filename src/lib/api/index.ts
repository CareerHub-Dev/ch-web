import { AxiosError } from 'axios';

export const backendServerUrl = process.env.BACKEND_SERVER_URL;
export const backendApiBaseUrl = `${backendServerUrl}/api/`;

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

export const retrieveAxiosErrorMessage = (err: AxiosError<any>) => {
  let message = err.response?.data?.detail;
  if (message) {
    return message;
  }
  return 'Невідома помилка';
};
