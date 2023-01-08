import { request } from '../../axios';

import { type AxiosInstance } from 'axios';

export const getJobPositions = (instance: AxiosInstance) =>
  request<
    Array<{
      id: string;
      name: string;
    }>
  >({
    instance,
    url: 'JobPositions',
  });
