import type { CallbackFn } from '@/lib/callback/types';
import RequestStatus from '@/models/enums/RequestStatus';
import UserRole from '@/models/enums/UserRole';
import { baseURL, retrieveErrorMessage } from '.';

export const sendAuthRequest = (
  email: string,
  password: string,
  role: UserRole,
  isLogin: boolean,
  callback: CallbackFn,
) => {
  let url;
  if (isLogin) {
    url = `${baseURL}Accounts/authenticate-${role}`;
  } else {
    url = `${baseURL}Accounts/register/student`;
  }
  const body = JSON.stringify({
    email,
    password,
  });
  console.log(body);

  fetch(url, {
    method: 'POST',
    body,
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'application/json-patch+json',
    },
    credentials: 'include',
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      const data = await res.json();
      throw new Error(retrieveErrorMessage(data));
    })
    .then((data) => {
      callback({ status: RequestStatus.Success, data });
    })
    .catch((err) => {
      callback({ status: RequestStatus.Error, message: err.message });
    });
};

export const sendForgotPasswordRequest = (
  email: string,
  callback: CallbackFn,
) => {
  fetch(`${baseURL}Accounts/forgot-password`, {
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
  callback: CallbackFn,
) => {
  fetch(`${baseURL}Accounts/reset-password`, {
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

export const sendRefreshTokenRequest = (callback: CallbackFn) => {
  const url = `${baseURL}Accounts/refresh-token-web`;
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
