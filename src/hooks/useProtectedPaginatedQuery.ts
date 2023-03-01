import useSession from './useSession';
import { type AxiosInstance } from 'axios';
import {
  type QueryKey,
  type UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { PaginatedResponse } from '@/lib/api/pagination';

export function useProtectedPaginatedQuery<
  TParams extends Omit<PaginatedRequestParams, 'pageNumber'>,
  TItem
>({
  queryKey,
  getItems,
  params,
  ...options
}: {
  queryKey: QueryKey;
  params: TParams;
  getItems: (
    params: TParams & { pageNumber: number }
  ) => (instance: AxiosInstance) => Promise<PaginatedResponse<Array<TItem>>>;
} & Omit<
  UseInfiniteQueryOptions<PaginatedResponse<Array<TItem>>>,
  'queryKey' | 'queryFn' | 'getNextPageParam' | 'enabled'
>) {
  const { axios, status } = useSession();

  return useInfiniteQuery<
    PaginatedResponse<Array<TItem>>,
    unknown,
    PaginatedResponse<Array<TItem>>,
    QueryKey
  >(
    queryKey,
    async ({ pageParam = 1 }) =>
      getItems({
        ...params,
        pageNumber: pageParam,
      })(axios),
    {
      enabled: status === 'authenticated',
      getNextPageParam: (lastPage) => {
        const { HasNext, CurrentPage } = lastPage.pagination;
        return HasNext && CurrentPage + 1;
      },
      ...options,
    }
  );
}
