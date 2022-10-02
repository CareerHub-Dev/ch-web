const localGatewayUrl = '/api/auth';

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
