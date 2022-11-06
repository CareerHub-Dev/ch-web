import { localGatewayAxiosInstance, request } from '../../axios';

import { type SessionData } from '@/lib/schemas/SessionData';
import { type AxiosInstance } from 'axios';

export namespace LocalGateway {
  export const authenticate = (data: { email: string; password: string }) =>
    request({
      instance: localGatewayAxiosInstance,
      url: 'auth/authenticate',
      method: 'POST',
      withCredentials: true,
      data,
    });

  export const refreshToken = (refreshToken: string) =>
    request<SessionData>({
      instance: localGatewayAxiosInstance,
      url: 'auth/refresh-token',
      method: 'POST',
      data: { refreshToken },
      withCredentials: true,
    });

  export const logout = () =>
    request({
      instance: localGatewayAxiosInstance,
      prefix: 'auth',
      url: 'signout',
      method: 'POST',
    });

  export const getMe = () =>
    request<SessionData>({
      instance: localGatewayAxiosInstance,
      url: 'me',
    });
}

export const authenticate = (data: { email: string; password: string }) =>
  request({
    url: 'authenticate',
    prefix: 'Account',
    method: 'POST',
    data,
    withCredentials: true,
  });

export const refreshToken = (token: string) =>
  request({
    url: 'Account/refresh-token',
    method: 'POST',
    data: { token },
    withCredentials: true,
  });

export const forgotPassword = (email: string) =>
  request({
    url: 'forgot-password',
    prefix: 'Account',
    method: 'POST',
    data: { email },
  });

export const resetPassword = (data: { password: string; token: string }) =>
  request({
    url: 'reset-password',
    prefix: 'Account',
    method: 'POST',
    data,
  });

export const changePassword =
  (instance: AxiosInstance) =>
  (data: { oldPassword: string; newPassword: string }) =>
    request({
      instance,
      url: 'Auth/Account/change-password',
      method: 'POST',
      data,
    });
