import useAuth from './useAuth';
import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
} from '@tanstack/react-query';

export default function useProtectedQuery<
  TQueryKey extends QueryKey = QueryKey,
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  queryKey: TQueryKey,
  queryFn: (accessToken?: string) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryFn' | 'queryKey'
  >
) {
  const { session } = useAuth();
  const accessToken = session?.jwtToken;

  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    enabled: !!accessToken,
    ...options,
    queryFn: () => queryFn(accessToken),
  });
}
