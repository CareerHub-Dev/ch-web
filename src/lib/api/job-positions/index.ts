import { request } from '../../axios';

import { type AxiosInstance } from 'axios';

export const getJobPositions = (instance: AxiosInstance) =>
  request({
    instance,
    url: 'JobPositions',
  });
