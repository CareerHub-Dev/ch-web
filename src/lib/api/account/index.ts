import { localGatewayAxiosInstance, request } from '../../axios';
import { type SessionData } from '@/lib/schemas/SessionData';

export namespace LocalGateway {
  export const authenticate = async (data: {
    email: string;
    password: string;
  }) =>
    request({
      instance: localGatewayAxiosInstance,
      url: 'authenticate',
      prefix: 'auth',
      method: 'POST',
      withCredentials: true,
      data,
    });

  export const refreshToken = async (refreshToken: string) =>
    request({
      instance: localGatewayAxiosInstance,
      url: 'authenticate',
      prefix: 'auth',
      method: 'POST',
      data: { refreshToken },
      withCredentials: true,
    });

  export const getMe = async () =>
    request<SessionData>({
      instance: localGatewayAxiosInstance,
      url: 'me',
    });
}

export const authenticate = async (data: { email: string; password: string }) =>
  request({
    url: 'authenticate',
    prefix: 'Account',
    method: 'POST',
    data,
    withCredentials: true,
  });

export const refreshToken = async (refreshToken: string) =>
  request({
    url: 'authenticate',
    prefix: 'Account',
    method: 'POST',
    data: { refreshToken },
    withCredentials: true,
  });

export const forgotPassword = async (email: string) =>
  request({
    url: 'forgot-password',
    prefix: 'Account',
    method: 'POST',
    data: { email },
  });

export const resetPassword = async (data: {
  password: string;
  token: string;
}) =>
  request({
    url: 'reset-password',
    prefix: 'Account',
    method: 'POST',
    data,
  });

export const changePassword =
  (jwt?: string) =>
  async (data: { oldPassword: string; newPassword: string }) =>
    request({
      prefix: 'Auth/Account',
      url: 'change-password',
      method: 'POST',
      data,
      headers: { Authorization: `Bearer ${jwt}` },
    });
