import { type UseQueryOptions } from '@tanstack/react-query';
import useProtectedQuery from './useProtectedQuery';
import { getStudent } from '@/lib/api/student';
import { type Student } from '@/lib/schemas/Student';

const useStudentQuery = ({
  accountId,
  ...options
}: {
  accountId: string;
} & Omit<UseQueryOptions<Student>, 'queryKey' | 'queryFn'>) => {
  return useProtectedQuery(['student', accountId], getStudent(accountId), {
    initialData: options?.initialData,
    onError: options?.onError,
    onSuccess: options?.onSuccess,
  });
};
export default useStudentQuery;

export type UseStudentQueryResult = ReturnType<typeof useStudentQuery>;
