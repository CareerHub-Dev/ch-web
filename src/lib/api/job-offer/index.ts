import { request } from '@/lib/axios';
import { parsePaginatedResponseAsync } from '../pagination';
import { JobOfferFeedSchema } from './schemas';

import { type AxiosInstance } from 'axios';

export const unsubscribeStudentFromJobOffer =
  (instance: AxiosInstance) => (jobOfferId: string) => {
    return request({
      instance,
      url: `/Student/JobOffers/${jobOfferId}/subscribe`,
      method: 'DELETE',
    });
  };

export const getJobOffers =
  (params: PaginatedRequestParams) => (instance: AxiosInstance) => {
    return request({
      instance,
      url: '/Student/JobOffers',
      params,
      select: parsePaginatedResponseAsync(JobOfferFeedSchema),
    });
  };
