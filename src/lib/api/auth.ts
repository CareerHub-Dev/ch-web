import type { CallbackFn } from '@/lib/util/callback/types';
import RequestStatus from '@/model/enums/RequestStatus';
import gateway, { baseURL, retrieveErrorMessage } from '.';

export const sendAuthRequest = (
  email: string,
  password: string,
  isLogin: boolean,
  callback: CallbackFn
) => {
  let url;
  if (isLogin) {
    url = `${baseURL}Accounts/authenticate-web`;
  } else {
    url = `${baseURL}Accounts/register/student`;
  }
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'application/json-patch+json',
    },
    credentials: 'include',
  })
    .then(async (res) => {
      callback({ status: RequestStatus.ResponseRecieved });
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
  callback: CallbackFn
) => {
  gateway
    .post('Accounts/forgot-password', {
      email,
    })
    .then((response) => {
      if (!response) {
        throw new Error('Немає відопвіді серверу');
      }
      callback({
        status: RequestStatus.Success,
        message: 'Перевірте пошту!',
      });
    })
    .catch((error) => {
      callback({ status: RequestStatus.Error, message: error.message });
    });
};

export const sendResetPasswordRequest = (
  password: string,
  token: string,
  callback: CallbackFn
) => {
  gateway
    .post('Accounts/reset-password', {
      token,
      password,
      confirmPassword: password,
    })
    .then((response) => {
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
    .catch((error) => {
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
