import { ZodSchema } from 'zod';
import { type AxiosResponse } from 'axios';
import XPaginationHeaderSchema, {
  type XPaginationHeader,
} from '../schemas/XPaginationHeader';

export type PaginatedResponse<T> = { data: T; pagination: XPaginationHeader };

export const parsePaginatedResponse =
  <T>(dataSchema: ZodSchema<T>) =>
  (response: AxiosResponse) => {
    const { data, headers } = response;
    const parsedHeader = JSON.parse(headers['x-pagination']);
    const pagination = XPaginationHeaderSchema.parse(parsedHeader);
    const parsedData = dataSchema.parse(data);
    return {
      data: parsedData,
      pagination,
    };
  };

export const parsePaginatedResponseAsync =
  <T>(dataSchema: ZodSchema<T>) =>
  async (response: AxiosResponse) => {
    const { data, headers } = response;
    const parsedHeader = JSON.parse(headers['x-pagination']);
    const pagination = XPaginationHeaderSchema.parse(parsedHeader);
    const parsedData = await dataSchema.parseAsync(data);
    return {
      data: parsedData,
      pagination,
    };
  };
