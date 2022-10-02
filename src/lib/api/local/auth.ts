import { CallbackFn } from '@/lib/callback/types';
import RequestStatus from '@/models/enums/RequestStatus';
import UserRole from '@/models/enums/UserRole';

const localGatewayUrl = '/api/auth';

/**
 * Sends the auth request to `local gateway`
 * that anyway will be handled by the remote one.
 * Primarilly, this is done to extend the authentication
 * by adding the `authority(role)` token to the response.
 * @deprecated
 */
export const sendLocalGatewayAuthRequest = (
  email: string,
  password: string,
  isLogin: boolean,
  role: UserRole,
  callback: CallbackFn
) => {
  const url = isLogin
    ? `${localGatewayUrl}/signin`
    : `${localGatewayUrl}/signup`;
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      role,
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
      throw new Error(data.message);
    })
    .then((data) => {
      callback({ status: RequestStatus.Success, data });
    })
    .catch((err) => {
      callback({ status: RequestStatus.Error, message: err.message });
    });
};

export const authenticate = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${localGatewayUrl}/signin`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'application/json-patch+json',
    },
    credentials: 'include',
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message);
};

export const refreshToken = async (refreshToken: string) => {
  const response = await fetch(`${localGatewayUrl}/signin`, {
    method: 'POST',
    body: JSON.stringify({ token: refreshToken }),
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'application/json-patch+json',
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(data.message);
};
