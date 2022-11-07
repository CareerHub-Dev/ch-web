import { UserPlusIcon } from '@heroicons/react/24/outline';
import useSession from '@/hooks/useSession';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchCompanySubscriptionStatus,
  changeSubscriptionStatus,
} from '@/lib/api/remote/companies';

const FollowButton: React.FC<{
  companyId: string;
}> = ({ companyId }) => {
  const { data: session } = useSession();
  const accessToken = session?.jwtToken as string;
  const queryClient = useQueryClient();
  const subscriptionStatusQuery = useQuery(
    ['company', companyId, 'subscriptions', 'self'],
    fetchCompanySubscriptionStatus({
      accessToken,
      companyId,
    }),
    {
      enabled: !!accessToken,
    }
  );
  const isFollowed = subscriptionStatusQuery.data;

  const subscriptionMutation = useMutation(
    ['company', companyId, 'subscribe'],
    changeSubscriptionStatus({
      accessToken,
      companyId,
      subscriptionStatus: isFollowed,
    }),
    {
      onError: (_error, _variables, restoreCache) => {
        restoreCache && restoreCache();
      },
      onMutate: () => {
        const cachedStatus = queryClient.getQueryData([
          'company',
          companyId,
          'subscriptions',
          'self',
        ]);
        const cachedAmount = queryClient.getQueryData([
          'company',
          companyId,
          'subscriptions',
          'amount',
        ]);
        const newStatus = !cachedStatus;
        queryClient.setQueryData(
          ['company', companyId, 'subscriptions', 'self'],
          newStatus
        );
        queryClient.setQueryData(
          ['company', companyId, 'subscriptions', 'amount'],
          (_: any) =>
            cachedStatus
              ? --(cachedAmount as number)
              : ++(cachedAmount as number)
        );

        return () => {
          queryClient.setQueryData(
            ['company', companyId, 'subscriptions', 'self'],
            cachedStatus
          );
          queryClient.setQueryData(
            ['company', companyId, 'subscriptions', 'amount'],
            cachedAmount
          );
        };
      },
      onSuccess: (_data, _variables, restoreCache) => {
        restoreCache && restoreCache();
        queryClient.setQueryData(
          ['company', companyId, 'subscriptions', 'self'],
          (prev: any) => !(prev as boolean)
        );
        queryClient.setQueryData(
          ['company', companyId, 'subscriptions', 'amount'],
          (prev: any) => (isFollowed ? --(prev as number) : ++(prev as number))
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(['company', companyId, 'subscriptions']);
      },
    }
  );
  const buttonText =
    subscriptionStatusQuery.isLoading || subscriptionMutation.isLoading
      ? '...'
      : isFollowed
      ? 'Відписатись'
      : 'Підписатись';

  const click = () => {
    subscriptionMutation.mutate();
  };

  return (
    <button
      onClick={click}
      className="flex items-center justify-center gap-4 rounded-lg bg-lightBlueAccent text-darkerBlue py-2 px-4 tracking-wide"
    >
      <UserPlusIcon className="w-6 h-6 text-darkerBlue" title="Підписатися" />
      <p>{buttonText}</p>
    </button>
  );
};

export default FollowButton;
