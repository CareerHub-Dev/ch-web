export const serverUrl = process.env.BACKEND_SERVER_URL;
export const baseURL = `${serverUrl}/api/`;

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
