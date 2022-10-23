import { request } from '@/lib/axios';

export const unsubscribeStudentFromCompany =
  (jwt?: string) => (companyId: string) => {
    return request({
      url: `/Student/Companies/${companyId}/subscribe`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${jwt}` },
    });
  };
