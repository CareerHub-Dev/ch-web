import { useProtectedQuery } from './useProtectedQuery';
import { type UseQueryOptions } from '@tanstack/react-query';
import { getSelfStudent } from '@/lib/api/student';

type Student = Awaited<ReturnType<typeof getSelfStudent>>;

export default function useSelfStudentQuery(
  options?: Omit<UseQueryOptions<Student>, 'queryFn' | 'queryKey'>
) {
  return useProtectedQuery(['selfStudent'], getSelfStudent, options);
}
