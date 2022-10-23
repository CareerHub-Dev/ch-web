import { AxiosResponse } from 'axios';
import { request, requestAsync } from '../../axios';
import { z } from 'zod';
import StudentSchema from '../../schemas/Student';
import {
  CompanySubscriptionsArraySchema,
  StudentSubscriptionsArraySchema,
} from './schemas';
import { JobOfferArraySchema } from '../../schemas/JobOffer';
import { parsePaginatedResponseAsync } from '../pagination';

const parseStudentAsync = async (response: AxiosResponse) =>
  await StudentSchema.parseAsync(response.data);

export const getStudent = (accountId: string) => (token?: string) =>
  requestAsync({
    url: `/Student/Students/${accountId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    select: parseStudentAsync,
  });

export const getSelfStudent = (token?: string) =>
  requestAsync({
    url: '/Student/Students/self',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    select: parseStudentAsync,
  });

export const getStudentSubscriptionsAmount =
  (subscriptionType: string) => (accountId: string) => (token?: string) =>
    request({
      url: `/Student/Students/${accountId}/amount-${subscriptionType}-subscriptions`,
      headers: { Authorization: `Bearer ${token}` },
      select: (response: AxiosResponse) => z.number().parse(response.data),
    });

export const getStudentStudentSubscriptionsAmount =
  getStudentSubscriptionsAmount('student');
export const getStudentCompanySubscriptionsAmount =
  getStudentSubscriptionsAmount('company');
export const getStudentJobOfferSubscriptionsAmount =
  getStudentSubscriptionsAmount('jobOffer');

export const updateStudentGeneralInfo = ({
  accessToken,
  ...data
}: {
  accessToken?: string;
  firstName: string;
  lastName: string;
  birthDate?: string | null;
  phone?: string | null;
  studentGroupId: string;
}) =>
  request({
    url: `/Student/Students/self/detail`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data,
  });

export const updateStudentPhoto = ({
  accessToken,
  file,
}: {
  accessToken?: string;
  file?: File;
}) => {
  const data = new FormData();
  data.append('file', file ?? 'undefined');

  return request({
    url: `/Student/Students/self/photo`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

export const getStudentCvs = (accountId: string) => (token?: string) =>
  request({
    url: `/Student/Students/${accountId}/Cvs`,
    headers: { Authorization: `Bearer ${token}` },
  });

type StudentSubscriptionsParams = Omit<PaginatedRequestParams, 'pageNumber'> & {
  accountId: string;
};

export const getStudentStudentSubscriptions =
  (params: StudentSubscriptionsParams) => (token?: string) => {
    const { accountId, ...rest } = params;
    return requestAsync({
      url: `/Student/Students/${accountId}/student-subscriptions`,
      headers: { Authorization: `Bearer ${token}` },
      params: rest,
      select: parsePaginatedResponseAsync(StudentSubscriptionsArraySchema),
    });
  };

export const getStudentCompanySubscriptions =
  (params: StudentSubscriptionsParams) => (token?: string) => {
    const { accountId, ...rest } = params;
    return requestAsync({
      url: `/Student/Students/${accountId}/company-subscriptions`,
      headers: { Authorization: `Bearer ${token}` },
      params: rest,
      select: parsePaginatedResponseAsync(CompanySubscriptionsArraySchema),
    });
  };

export const getStudentJobOfferSubscriptions =
  (params: StudentSubscriptionsParams) => (token?: string) => {
    const { accountId, ...rest } = params;
    return requestAsync({
      url: `/Student/Students/${accountId}/jobOffer-subscriptions`,
      headers: { Authorization: `Bearer ${token}` },
      params: rest,
      select: parsePaginatedResponseAsync(JobOfferArraySchema),
    });
  };

export const unsubscribeStudentFromStudent = (jwt?: string) => (studentId: string) => {
  return request({
    url: `/Student/Students/${studentId}/subscribe`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${jwt}` },
  });
}
