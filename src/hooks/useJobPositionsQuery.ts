import useProtectedQuery from './useProtectedQuery';
import { getJobPositions } from '@/lib/api/job-positions';
import { UseQueryOptions } from '@tanstack/react-query';

export default function useJobPositionsQuery(
  options?: Omit<
    UseQueryOptions<any, unknown, any, string[]>,
    'queryKey' | 'queryFn'
  >
) {
  const q = useProtectedQuery(['jobPositions'], getJobPositions, {
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
