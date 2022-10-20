import useAuth from './useAuth';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getStudent } from '@/lib/api/student';

const defaultErrorHandler = (error: any) => {
  alert(error.message || 'Помилка звернення до серверу');
};

const useStudentQuery: (opts?: {
  onSuccess?: AnyFn;
  onError?: AnyFn;
  initialData?: any;
}) => UseQueryResult<any, any> = (options) => {
  const onSuccess = options?.onSuccess;
  const onError = options?.onError || defaultErrorHandler;
  const { session } = useAuth();
  const accountId = session?.accountId as string;
  const accessToken = session?.jwtToken as string;

  const studentQuery = useQuery(
    ['student', accountId],
    () => getStudent(accountId)(accessToken),
    {
      initialData: options?.initialData,
      enabled: !!accessToken && !!accountId,
      onError,
      onSuccess,
    }
  );
  return studentQuery;
};
export default useStudentQuery;

export type UseStudentQueryResult = ReturnType<typeof useStudentQuery>;
