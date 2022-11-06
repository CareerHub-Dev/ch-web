import { ZodSchema } from 'zod';
import XPaginationHeaderSchema, {
  type XPaginationHeader,
} from '../schemas/XPaginationHeader';

import { type AxiosResponse } from 'axios';

export type PaginatedResponse<T> = { data: T; pagination: XPaginationHeader };

export const parsePaginatedResponse =
  <T>(dataSchema: ZodSchema<T>) =>
  (response: AxiosResponse) => {
    const { data, headers } = response;
    const unparsedPaginationHeaders = headers['x-pagination'];
    if (!unparsedPaginationHeaders) {
      throw new Error('No pagination headers found');
    }
    const parsedHeader = JSON.parse(unparsedPaginationHeaders);
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
    const unparsedPaginationHeaders = headers['x-pagination'];
    if (!unparsedPaginationHeaders) {
      throw new Error('No pagination headers found');
    }
    const parsedHeader = JSON.parse(unparsedPaginationHeaders);
    const pagination = XPaginationHeaderSchema.parse(parsedHeader);
    const parsedData = await dataSchema.parseAsync(data);
    return {
      data: parsedData,
      pagination,
    };
  };
