import useAuth from './useAuth';
import {
  useQuery,
  type QueryKey,
  type QueryOptions,
} from '@tanstack/react-query';

type UseQueryParams = Parameters<typeof useQuery>;

export default function useProtectedQuery(
  queryKey: QueryKey,
  queryFnCreator: (accessToken: Nullable<string>) => UseQueryParams[1],
  options?: QueryOptions
) {
  const { accessToken } = useAuth();
  const q = useQuery(queryKey, queryFnCreator(accessToken), {
    enabled: !!accessToken,
    ...options,
  });
  return q;
}
