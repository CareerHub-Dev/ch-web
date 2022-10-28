import useProtectedQuery from './useProtectedQuery';
import { type UseQueryOptions } from '@tanstack/react-query';
import { getSelfStudent } from '@/lib/api/student';
import { type Student } from '@/lib/schemas/Student';

export default function useSelfStudentQuery(
  options?: Omit<UseQueryOptions<Student>, 'queryFn' | 'queryKey'>
) {
  return useProtectedQuery(['selfStudent'], getSelfStudent, options);
}
