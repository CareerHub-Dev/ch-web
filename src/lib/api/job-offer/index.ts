import { request } from '@/lib/axios';
import { parsePaginatedResponseAsync } from '../pagination';
import { JobOfferFeedSchema } from './schemas';

import { type AxiosInstance } from 'axios';

export const getJobOffers =
  (params: PaginatedRequestParams) => (instance: AxiosInstance) => {
    return request({
      instance,
      url: '/Student/JobOffers',
      params,
      select: parsePaginatedResponseAsync(JobOfferFeedSchema),
    });
  };

const doOnJobOfferSubscription =
  (method: 'POST' | 'DELETE' | 'GET') =>
  (instance: AxiosInstance) =>
  (jobOfferId: string) => {
    return request({
      method,
      prefix: 'Student',
      url: `JobOffers/${jobOfferId}/subscribe`,
      instance,
    });
  };

export const unsubscribeStudentFromJobOffer =
  doOnJobOfferSubscription('DELETE');
export const subscribeStudentToJobOffer = doOnJobOfferSubscription('POST');
export const getSubscriptionOnJobOffer = doOnJobOfferSubscription('GET');
