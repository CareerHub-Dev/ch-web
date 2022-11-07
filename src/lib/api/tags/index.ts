import { request } from '../../axios';

import { type AxiosInstance } from 'axios';

export const getTags = (instance: AxiosInstance) => {
  return request({
    instance,
    url: 'Auth/Tags',
  });
};
