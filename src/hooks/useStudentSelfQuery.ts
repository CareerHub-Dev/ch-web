import useProtectedQuery from './useProtectedQuery';
import { getSelfStudent } from '@/lib/api/student';

const useSelfStudentQuery = (opts?: { initialData: any }) => {
  const query = useProtectedQuery(['selfStudent'], getSelfStudent, opts);
  return query;
};
export default useSelfStudentQuery;
