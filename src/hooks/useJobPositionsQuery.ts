import useAuth from './useAuth';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { fetchJobPositions } from '@/lib/api/remote/jobPositions';

export default function useJobPositionsQuery(
  options?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'enabled'>
) {
  const { accessToken } = useAuth();
  const q = useQuery(['jobPositions'], fetchJobPositions({ accessToken }), {
    enabled: !!accessToken,
    ...options,
  });
  const jobPositionOptions =
    q.data?.map((item: any) => ({
      value: item['id'],
      text: item['name'],
    })) || [];

  return {
    ...q,
    options: jobPositionOptions,
  };
}
