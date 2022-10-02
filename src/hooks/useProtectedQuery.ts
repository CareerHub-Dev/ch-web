import useAuth from './useAuth';
import {
  useQuery,
  type QueryFunction,
  type UseQueryOptions,
  type UseQueryResult,
  type QueryKey,
} from '@tanstack/react-query';

export default function useProtectedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFnCreator: (
    accessToken: string | null
  ) => QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryFn' | 'queryKey'
  >
): UseQueryResult<TData, TError> {
  const { accessToken } = useAuth();

  const q = useQuery({
    queryKey,
    enabled: !!accessToken,
    ...options,
    queryFn: queryFnCreator(accessToken),
  });
  return q;
}
