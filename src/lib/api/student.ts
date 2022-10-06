import { request } from '../axios';

export const getStudent = (accountId: string) => (token: string | null) => () =>
  request({
    url: `/Student/Students/${accountId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getStudentSubscriptionsAmount =
  (subscriptionType: string) =>
  (accountId: string) =>
  (token: string | null) =>
  () =>
    request({
      url: `/Student/Students/${accountId}/SubscriptionsAmount/${subscriptionType}`,
      headers: { Authorization: `Bearer ${token}` },
    });

export const getStudentStudentSubscriptionsAmount =
  getStudentSubscriptionsAmount('student');
export const getStudentCompanySubscriptionsAmount =
  getStudentSubscriptionsAmount('company');
export const getStudentJobOfferSubscriptionsAmount =
  getStudentSubscriptionsAmount('jobOffer');

export const updateStudentGeneralInfo = (data: {
  accountId: string;
  accessToken: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  phone?: string;
}) =>
  request({
    url: `/Student/Students/${data.accountId}/GeneralInfo`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
    data,
  });

export const fetchStudentCvs =
  (accountId: string) => (accessToken: string | null) => () =>
    request({
      url: `/Student/Students/${accountId}/Cvs`,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
