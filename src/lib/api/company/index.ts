import { type AxiosInstance } from 'axios';
import { request } from '@/lib/axios';

export const unsubscribeStudentFromCompany =
  (instance: AxiosInstance) => (companyId: string) => {
    return request({
      instance,
      url: `/Student/Companies/${companyId}/subscribe`,
      method: 'DELETE',
    });
  };
