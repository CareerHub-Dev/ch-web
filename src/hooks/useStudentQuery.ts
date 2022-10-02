import useAuth from './useAuth';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchStudent } from '@/lib/api/remote/student';

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
  const { accessToken, sessionData } = useAuth();
  const accountId = sessionData?.accountId;

  const studentQuery = useQuery(
    ['student', accountId],
    fetchStudent({
      accountId: accountId as string,
      accessToken: accessToken as string,
    }),
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
