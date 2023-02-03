import { request } from '../../axios';
import { JobPositionArraySchema } from './schema';
import { type AxiosInstance } from 'axios';

export const getJobPositions = (instance: AxiosInstance) =>
  request({
    instance,
    prefix: 'Auth',
    url: 'JobPositions',
    select: (res) => JobPositionArraySchema.parseAsync(res.data),
  });
