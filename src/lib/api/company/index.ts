import { z } from 'zod';
import { request } from '@/lib/axios';
import { parsePaginatedResponseAsync } from '../pagination';
import {
  CompanyInFeedArraySchema,
  CompanyDetailsSchema,
  CompanyJobOffersArraySchema,
} from './schemas';

import { type AxiosInstance } from 'axios';

export const getCompanies =
  (params: Omit<PaginatedRequestParams, 'pageNumber'>) =>
  (instance: AxiosInstance) =>
    request({
      instance,
      prefix: 'Student',
      url: 'Companies',
      params,
      select: parsePaginatedResponseAsync(CompanyInFeedArraySchema),
    });

export const getCompany = (companyId: string) => (instance: AxiosInstance) =>
  request({
    instance,
    prefix: 'Student',
    url: `Companies/${companyId}`,
    select: (res) => CompanyDetailsSchema.parseAsync(res.data),
  });

export const getCompanyJobOffers =
  ({
    companyId,
    ...params
  }: Omit<PaginatedRequestParams, 'pageNumber'> & {
    companyId: string;
  }) =>
  (instance: AxiosInstance) => {
    return request({
      instance,
      prefix: 'Student',
      url: `Companies/${companyId}/JobOffers`,
      params,
      select: parsePaginatedResponseAsync(CompanyJobOffersArraySchema),
    });
  };

export const subscribeStudentToCompany =
  (instance: AxiosInstance) => (companyId: string) =>
    request({
      instance,
      prefix: 'Student',
      url: `Companies/${companyId}/subscribe`,
      method: 'POST',
    });

export const unsubscribeStudentFromCompany =
  (instance: AxiosInstance) => (companyId: string) =>
    request({
      instance,
      prefix: 'Student',
      url: `Companies/${companyId}/subscribe`,
      method: 'DELETE',
    });

export const getCompanyStat =
  (stat: 'subscribers' | 'jobOffers') =>
  (companyId: string) =>
  (instance: AxiosInstance) =>
    request({
      instance,
      prefix: 'Student',
      url: `Companies/${companyId}/amount-${stat}`,
      select: (res) => z.number().parseAsync(res.data),
    });

export const getCompanySubscribersAmount = getCompanyStat('subscribers');
export const getCompanyJobOffersAmount = getCompanyStat('jobOffers');
