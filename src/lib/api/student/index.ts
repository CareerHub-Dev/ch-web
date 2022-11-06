import { request } from '../../axios';
import { z } from 'zod';
import StudentSchema from '../../schemas/Student';
import {
  CompanySubscriptionsArraySchema,
  StudentSubscriptionsArraySchema,
} from './schemas';
import { JobOfferArraySchema } from '../../schemas/JobOffer';
import { parsePaginatedResponseAsync } from '../pagination';

import { type AxiosInstance, type AxiosResponse } from 'axios';

const parseStudentAsync = async (response: AxiosResponse) =>
  StudentSchema.parseAsync(response.data);

export const getStudent = (accountId: string) => (instance: AxiosInstance) =>
  request({
    instance,
    url: `/Student/Students/${accountId}`,
    select: parseStudentAsync,
  });

export const getSelfStudent = (instance: AxiosInstance) =>
  request({
    instance,
    url: '/Student/Students/self',
    select: parseStudentAsync,
  });

export const getStudentSubscriptionsAmount =
  (subscriptionType: string) =>
  (accountId: string) =>
  (instance: AxiosInstance) =>
    request({
      instance,
      url: `/Student/Students/${accountId}/amount-${subscriptionType}-subscriptions`,
      select: (response: AxiosResponse) => z.number().parse(response.data),
    });

export const getStudentStudentSubscriptionsAmount =
  getStudentSubscriptionsAmount('student');
export const getStudentCompanySubscriptionsAmount =
  getStudentSubscriptionsAmount('company');
export const getStudentJobOfferSubscriptionsAmount =
  getStudentSubscriptionsAmount('jobOffer');

export const updateStudentGeneralInfo =
  (instance: AxiosInstance) =>
  (data: {
    firstName: string;
    lastName: string;
    birthDate?: string | null;
    phone?: string | null;
    studentGroupId: string;
  }) =>
    request({
      instance,
      url: `/Student/Students/self/detail`,
      method: 'PUT',
      data,
    });

export const updateStudentPhoto =
  (instance: AxiosInstance) => (file?: File) => {
    const data = new FormData();
    data.append('file', file ?? 'undefined');

    return request({
      instance,
      url: `/Student/Students/self/photo`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
  };

export const getStudentCvs = (accountId: string) => (instance: AxiosInstance) =>
  request({
    instance,
    url: `/Student/Students/${accountId}/Cvs`,
  });

type StudentSubscriptionsParams = Omit<PaginatedRequestParams, 'pageNumber'> & {
  accountId: string;
};

export const getStudentStudentSubscriptions =
  (params: StudentSubscriptionsParams) => (instance: AxiosInstance) => {
    const { accountId, ...rest } = params;
    return request({
      instance,
      url: `/Student/Students/${accountId}/student-subscriptions`,
      params: rest,
      select: parsePaginatedResponseAsync(StudentSubscriptionsArraySchema),
    });
  };

export const getStudentCompanySubscriptions =
  (params: StudentSubscriptionsParams) => (instance: AxiosInstance) => {
    const { accountId, ...rest } = params;
    return request({
      instance,
      url: `/Student/Students/${accountId}/company-subscriptions`,
      params: rest,
      select: parsePaginatedResponseAsync(CompanySubscriptionsArraySchema),
    });
  };

export const getStudentJobOfferSubscriptions =
  (params: StudentSubscriptionsParams) => (instance: AxiosInstance) => {
    const { accountId, ...rest } = params;
    return request({
      instance,
      url: `/Student/Students/${accountId}/jobOffer-subscriptions`,
      params: rest,
      select: parsePaginatedResponseAsync(JobOfferArraySchema),
    });
  };

export const unsubscribeStudentFromStudent =
  (instance: AxiosInstance) => (studentId: string) => {
    return request({
      instance,
      url: `/Student/Students/${studentId}/subscribe`,
      method: 'DELETE',
    });
  };
