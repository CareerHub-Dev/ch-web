import { request } from '@/lib/axios';

export const unsubscribeStudentFromJobOffer =
  (jwt?: string) => (jobOfferId: string) => {
    return request({
      url: `/Student/JobOffers/${jobOfferId}/subscribe`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${jwt}` },
    });
  };
