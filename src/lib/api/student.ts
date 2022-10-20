import { AxiosResponse } from 'axios';
import { request } from '../axios';
import parseJson from '../json-safe-parse';
import StudentSchema from '../schemas/Student';
import XPaginationHeaderSchema, {
  type XPaginationHeader,
} from '../schemas/XPaginationHeader';

const parseStudent = (response: AxiosResponse) =>
  StudentSchema.parse(response.data);

export const getStudent = (accountId: string) => (token?: string) =>
  request({
    url: `/Student/Students/${accountId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    select: parseStudent,
  });

export const getSelfStudent = (token?: string) =>
  request({
    url: '/Student/Students/self',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    select: parseStudent,
  });

export const getStudentSubscriptionsAmount =
  (subscriptionType: string) => (accountId: string) => (token?: string) =>
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

export const fetchStudentCvs =
  (accountId: string) => (accessToken: string | null) => () =>
    request({
      url: `/Student/Students/${accountId}/Cvs`,
      headers: { Authorization: `Bearer ${accessToken}` },
    });

export const getStudentSubscriptions =
  (type: 'company' | 'jobOffer' | 'student') =>
  ({
    accountId,
    ...params
  }: {
    accountId: string;
    pageNumber: number;
    pageSize: number;
    searchTerm?: string;
    orderByExpression?: string;
  }) =>
  (accessToken: string | null) =>
  () => {
    return request({
      url: `/Student/Students/${accountId}/${type}-subscriptions`,
      select: (response) => {
        const { data, headers } = response;
        let pagination: XPaginationHeader | null = null;
        if (headers['x-pagination']) {
          const parsed = parseJson(headers['x-pagination']);
          if (parsed.success) {
            const parsedHeader = XPaginationHeaderSchema.safeParse(parsed.data);
            if (parsedHeader.success) {
              pagination = parsedHeader.data;
            }
          }
        }
        return {
          data,
          pagination,
        };
      },
      params,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };
