import { request } from '../axios';

export const authenticate = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return request<RawSessionData>({
    url: 'Account/authenticate',
    method: 'POST',
    data: { email, password },
  });
};

export const refreshToken = (refreshToken: string) => {
  return request<RawSessionData>({
    url: 'Account/refresh-token',
    method: 'POST',
    data: { token: refreshToken },
  });
};
