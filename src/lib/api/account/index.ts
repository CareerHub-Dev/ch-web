import { localGatewayAxiosInstance, request } from "../../axios";
import { SessionData } from "@/lib/schemas/SessionData";
import { AxiosInstance } from "axios";

export namespace LocalGateway {
  export function authenticate(data: { email: string; password: string }) {
    return request({
      instance: localGatewayAxiosInstance,
      url: "auth/authenticate",
      method: "POST",
      withCredentials: true,
      data,
    });
  }

  export function refreshToken(refreshToken: string) {
    return request<SessionData>({
      instance: localGatewayAxiosInstance,
      url: "auth/refresh-token",
      method: "POST",
      data: { refreshToken },
    });
  }

  export function logout() {
    return request({
      instance: localGatewayAxiosInstance,
      prefix: "auth",
      url: "signout",
      method: "POST",
    });
  }

  export function getMe() {
    return request<SessionData>({
      instance: localGatewayAxiosInstance,
      url: "me",
    });
  }
}

export function authenticate(data: { email: string; password: string }) {
  return request({
    url: "authenticate",
    prefix: "Account",
    method: "POST",
    data,
    withCredentials: true,
  });
}

export function registerStudent(data: { email: string; password: string }) {
  return request({
    url: "register-student",
    prefix: "Account",
    method: "POST",
    data,
    withCredentials: true,
  });
}

export function refreshToken(token: string) {
  return request({
    url: "Account/refresh-token",
    method: "POST",
    data: { token },
    withCredentials: true,
  });
}

export function forgotPassword(email: string) {
  return request({
    url: "forgot-password",
    prefix: "Account",
    method: "POST",
    data: { email },
  });
}

export function resetPassword(data: { password: string; token: string }) {
  return request({
    url: "reset-password",
    prefix: "Account",
    method: "POST",
    data,
  });
}

export function changePassword(instance: AxiosInstance) {
  return (data: { oldPassword: string; newPassword: string }) =>
    request({
      instance,
      url: "Auth/Account/change-password",
      method: "POST",
      data,
    });
}

export function activateAccount(data: { token: string; role: string }) {
  return request({
    url: `verify-${data.role}-email`,
    prefix: "Account",
    method: "POST",
    data: { token: data.token },
  });
}
