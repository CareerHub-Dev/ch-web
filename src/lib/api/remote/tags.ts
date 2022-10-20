import { request } from '../../axios';

export const getTags = (token?: string) => {
  return request({
    url: 'Auth/Tags',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
