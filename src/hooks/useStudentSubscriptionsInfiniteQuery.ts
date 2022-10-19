import useAuth from './useAuth';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getStudentSubscriptions } from '@/lib/api/student';

export default function useStudentSubscriptionsInfiniteQuery(opts: {
  accountId: string;
  type: 'company' | 'jobOffer' | 'student';
  onError?: (error: unknown) => void;
  onSuccess?: (data: any) => void;
  params: {
    pageSize: number;
    searchTerm?: string;
    orderByExpression?: string;
  };
}) {
  const auth = useAuth();
  const accessToken = auth.session?.jwtToken;

  return useInfiniteQuery(
    [`student-subscriptions-${opts.type}`, opts.params],
    async ({ pageParam = 1 }) =>
      getStudentSubscriptions(opts.type)({
        ...opts.params,
        pageNumber: pageParam,
        accountId: opts.accountId,
      })(accessToken as string)(),
    {
      enabled: !!accessToken,
      getNextPageParam: (lastPage) => {
        return lastPage?.pagination?.HasNext
          ? lastPage?.pagination?.CurrentPage + 1
          : undefined;
      },
      onError: opts.onError,
      onSuccess: opts.onSuccess,
    }
  );
}
