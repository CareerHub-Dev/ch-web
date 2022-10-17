import { request } from '../axios';

export const getStudent = (accountId: string) => (token: string | null) => () =>
  request({
    url: `/Student/Students/${accountId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getSelfStudent = (token: string | null) => () =>
  request({
    url: '/Student/Students/self',
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
      url: `/Student/Students/${accountId}/amount-${subscriptionType}-subscriptions`,
      headers: { Authorization: `Bearer ${token}` },
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
  birthDate?: string;
  phone?: string;
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
  blob,
}: {
  accessToken?: string;
  blob?: Blob;
}) => {
  const data = new FormData();
  data.append('file', blob ?? 'undefined');

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

export const fetchStudentCvs =
  (accountId: string) => (accessToken: string | null) => () =>
    request({
      url: `/Student/Students/${accountId}/Cvs`,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
