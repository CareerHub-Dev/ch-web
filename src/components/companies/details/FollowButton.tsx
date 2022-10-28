import FollowIcon from '@/components/ui/icons/FollowIcon';
import useSession from '@/hooks/useSession';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchCompanySubscriptionStatus,
  changeSubscriptionStatus,
} from '@/lib/api/remote/companies';
import classes from './FollowButton.module.scss';

const unFollowedStyle = {
  color: `#c20a0a`,
  background: `#ffc8c8`,
};
const undefinedStyle = {
  color: `#c20a0a`,
  background: `#ffc8c8`,
};
const followedStyle = {
  color: 'white',
  background: 'grey',
};

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
  const activeStyle =
    subscriptionStatusQuery.isLoading || subscriptionMutation.isLoading
      ? undefinedStyle
      : isFollowed
      ? followedStyle
      : unFollowedStyle;

  const clickHandler = (event: any) => {
    event.preventDefault();
    subscriptionMutation.mutate();
  };

  return (
    <button
      style={activeStyle}
      onClick={clickHandler}
      className={classes.follow}
    >
      <FollowIcon fill={activeStyle.color} />
      <p>{buttonText}</p>
    </button>
  );
};

export default FollowButton;
