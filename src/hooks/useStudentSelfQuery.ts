import useProtectedQuery from './useProtectedQuery';
import { type UseQueryOptions } from '@tanstack/react-query';
import { getSelfStudent } from '@/lib/api/student';
import { type Student } from '@/lib/schemas/Student';

const useSelfStudentQuery = (
  options?: Omit<UseQueryOptions<Student>, 'queryFn' | 'queryKey'>
) => {
  return useProtectedQuery(['selfStudent'], getSelfStudent, options);
};
export default useSelfStudentQuery;
