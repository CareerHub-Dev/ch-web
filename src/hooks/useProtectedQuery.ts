import useSession from './useSession';
import {
  useQuery,
  type UseQueryOptions,
  type QueryKey,
} from '@tanstack/react-query';
import { type AxiosInstance } from 'axios';

export default function useProtectedQuery<
  TQueryKey extends QueryKey = QueryKey,
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData
>(
  queryKey: TQueryKey,
  queryFn: (instance: AxiosInstance) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryFn' | 'queryKey'
  >
) {
  const { axios, status } = useSession();

  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    enabled: status === 'authenticated',
    ...options,
    queryFn: () => queryFn(axios),
  });
}
