import { backendApiBaseUrl, retrieveErrorMessage } from '..';
import { request } from '../axios';

export const getStudent =
  (accountId: string) => (accessToken: string | null) => () =>
    request({
      url: `Student/Students/${accountId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
// async () => {
//   try {
//     const url = `${backendApiBaseUrl}Student/Students/${accountId}`;
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Accept: 'text/plain',
//         'Content-Type': 'application/json-patch+json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     const data = await response.json();
//     if (response.ok) {
//       return data;
//     }
//     throw new Error(retrieveErrorMessage(data));
//   } catch (error: any) {
//     throw new Error(error?.message || 'Помилка звернення до серверу');
//   }
// };

export const updateStudentGeneralInfo =
  ({
    accountId,
    accessToken,
    firstName,
    lastName,
    photo,
    phone,
  }: {
    accountId: string;
    accessToken: string;
    firstName?: string;
    lastName?: string;
    photo?: string;
    phone?: string;
  }) =>
  async () => {
    try {
      const url = `${backendApiBaseUrl}Students/${accountId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json-patch+json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      throw new Error(retrieveErrorMessage(data));
    } catch (error: any) {
      throw new Error(error?.message || 'Помилка звернення до серверу');
    }
  };

export const fetchStudentCvs =
  ({ accountId, accessToken }: { accountId: string; accessToken: string }) =>
  async () => {
    try {
      const url = `${backendApiBaseUrl}Students/${accountId}/CVs`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'application/json-patch+json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      throw new Error(retrieveErrorMessage(data));
    } catch (error: any) {
      throw new Error(error?.message || 'Помилка звернення до серверу');
    }
  };

export const getStudentSubscriptionsAmount =
  (subscriptionType: string) =>
  (accountId: string) =>
  (accessToken: string | null) =>
  async () => {
    try {
      const url = `${backendApiBaseUrl}Student/Students/${accountId}/amount-${subscriptionType}-subscriptions`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'text/plain',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      }
      throw new Error(retrieveErrorMessage(data));
    } catch (error: any) {
      throw new Error(error?.message || 'Помилка звернення до серверу');
    }
  };

export const getStudentStudentSubscriptionsAmount =
  getStudentSubscriptionsAmount('student');
export const getStudentCompanySubscriptionsAmount =
  getStudentSubscriptionsAmount('company');
export const getStudentJobOfferSubscriptionsAmount =
  getStudentSubscriptionsAmount('jobOffer');
