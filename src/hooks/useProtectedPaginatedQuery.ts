import useSession from './useSession';
import {
  type QueryKey,
  type UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { PaginatedResponse } from '@/lib/api/pagination';

export default function useProtectedPaginatedQuery<
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
    params: TParams
  ) => (token?: string) => Promise<PaginatedResponse<Array<TItem>>>;
} & Omit<
  UseInfiniteQueryOptions<PaginatedResponse<Array<TItem>>>,
  'queryKey' | 'queryFn' | 'getNextPageParam' | 'enabled'
>) {
  const { data: session } = useSession();
  const accessToken = session?.jwtToken;

  return useInfiniteQuery<
    PaginatedResponse<Array<TItem>>,
    unknown,
    PaginatedResponse<Array<TItem>>,
    QueryKey
  >(
    [...queryKey, params],
    async ({ pageParam = 1 }) =>
      getItems({
        ...params,
        pageNumber: pageParam,
      })(accessToken),
    {
      enabled: !!accessToken,
      getNextPageParam: (lastPage) => {
        const { HasNext, CurrentPage } = lastPage.pagination;
        return HasNext && CurrentPage + 1;
      },
      ...options,
    }
  );
}
