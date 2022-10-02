import RequestStatus from '@/models/enums/RequestStatus';
import { backendApiBaseUrl, retrieveErrorMessage } from '..';

export const sendForgotPasswordRequest = (email: string, callback: any) => {
  fetch(`${backendApiBaseUrl}Accounts/forgot-password`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'application/json-patch+json',
    },
  })
    .then((response: Response) => {
      if (!response) {
        throw new Error('Немає відопвіді серверу');
      }
      callback({
        status: RequestStatus.Success,
        message: 'Перевірте пошту!',
      });
    })
    .catch((error: Error) => {
      callback({ status: RequestStatus.Error, message: error.message });
    });
};

export const sendResetPasswordRequest = (
  password: string,
  token: string,
  callback: any
) => {
  fetch(`${backendApiBaseUrl}Accounts/reset-password`, {
    method: 'POST',
    body: JSON.stringify({ password, token, confirmPassword: password }),
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'application/json-patch+json',
    },
  })
    .then((response: Response) => {
      if (!response) {
        callback({
          status: RequestStatus.Error,
          message: 'Немає відопвіді серверу',
        });
      }
      callback({
        status: RequestStatus.Success,
        message: 'Пароль успішно оновлено!',
      });
    })
    .catch((error: Error) => {
      callback({ status: RequestStatus.Error, message: error.message });
    });
};

export const sendRefreshTokenRequest = (callback: any) => {
  const url = `${backendApiBaseUrl}Accounts/refresh-token-web`;
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      token: null,
    }),
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'application/json-patch+json',
    },
    credentials: 'include',
  })
    .then(async (response) => {
      if (response.ok) {
        return response.json();
      }
      const data = await response.json();
      throw new Error(retrieveErrorMessage(data));
    })
    .then((data) => {
      callback({ status: RequestStatus.Success, data });
    })
    .catch((err) => {
      callback({ status: RequestStatus.Error, message: err.message });
    });
};
