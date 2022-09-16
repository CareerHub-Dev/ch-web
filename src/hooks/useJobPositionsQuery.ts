import useProtectedQuery from './useProtectedQuery';
import { fetchJobPositions } from '@/lib/api/remote/jobPositions';
import { UseQueryOptions } from '@tanstack/react-query';

export default function useJobPositionsQuery(
  options?: Omit<UseQueryOptions<any, unknown, any, string[]>, 'enabled'>
) {
  const q = useProtectedQuery(['jobPositions'], fetchJobPositions, {
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
