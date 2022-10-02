import axios from '../axios';

export const authenticate = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post('Account/authenticate', {
    email,
    password,
  });
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await axios.post('Account/authenticate', {
    token: refreshToken,
  });
  return response.data;
};
