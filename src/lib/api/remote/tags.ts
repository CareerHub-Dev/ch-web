import { request } from '../../axios';

export const getTags = (accessToken: Nullable<string>) => async () => {
  return request({
    url: 'Auth/Tags',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
