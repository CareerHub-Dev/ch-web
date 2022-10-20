import useProtectedQuery from './useProtectedQuery';
import { getSelfStudent } from '@/lib/api/student';
import { type Student } from '@/lib/schemas/Student';

const useSelfStudentQuery = (options?: { initialData?: Student }) => {
  return useProtectedQuery(['self'], getSelfStudent, options);
};
export default useSelfStudentQuery;
