import useAuth from './useAuth';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { fetchStudent } from '@/lib/api/remote/student';

interface Options {
  onSuccess?: AnyFn;
  onError?: AnyFn;
}

const defaultErrorHandler = (error: any) => {
  alert(error.message || 'Помилка звернення до серверу');
};

const useStudentQuery: (opts?: Options) => UseQueryResult<any, any> = (
  options
) => {
  const onSuccess = options?.onSuccess;
  const onError = options?.onError || defaultErrorHandler;
  const { accessToken, accountId } = useAuth();

  const studentQuery = useQuery(
    ['student', accountId],
    fetchStudent({
      accountId: accountId as string,
      accessToken: accessToken as string,
    }),
    {
      enabled: !!accessToken && !!accountId,
      onError,
      onSuccess,
    }
  );
  return studentQuery;
};
export default useStudentQuery;