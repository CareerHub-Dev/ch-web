import useProtectedQuery from './useProtectedQuery';
import { getJobPositions } from '@/lib/api/job-positions';
import { UseQueryOptions } from '@tanstack/react-query';

export default function useJobPositionsQuery(
  options?: Omit<
    UseQueryOptions<
      Array<{
        id: string;
        name: string;
      }>,
      unknown,
      Array<{
        id: string;
        name: string;
      }>,
      string[]
    >,
    'queryKey' | 'queryFn'
  >
) {
  return useProtectedQuery<
    string[],
    Array<{
      id: string;
      name: string;
    }>
  >(['jobPositions'], getJobPositions, {
    ...options,
  });
}
