import { type AxiosInstance } from 'axios';
import { request } from '../../axios';

export const getTags = (instance: AxiosInstance) => {
  return request({
    instance,
    url: 'Auth/Tags',
  });
};
