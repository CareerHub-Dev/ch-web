import { baseURL, retrieveErrorMessage } from '.';

export const authenticate = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(`${baseURL}Account/authenticate`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      Accept: 'text/plain',
      'Content-Type': 'application/json-patch+json',
    },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  throw new Error(retrieveErrorMessage(data));
};

export const refreshToken = async (refreshToken: string) => {
  const response = await fetch(`${baseURL}Account/refresh-token`, {
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
  throw new Error(retrieveErrorMessage(data));
};
