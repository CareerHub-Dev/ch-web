import { type AxiosInstance } from 'axios';
import { request } from '../../axios';

export const getJobPositions = (instance: AxiosInstance) =>
  request({
    instance,
    url: 'JobPositions',
  });
