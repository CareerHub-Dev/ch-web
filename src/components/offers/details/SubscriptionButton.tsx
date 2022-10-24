import useSession from '@/hooks/useSession';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchJobOfferSubscriptionStatus,
  changeSubscriptionStatus,
} from '@/lib/api/remote/jobOffers';
import CheckIcon from '@/components/ui/icons/CheckIcon';
import LinkButton from '@/components/ui/LinkButton';

import classes from './GeneralInfo.module.scss';

const SubscriptionButton = ({ jobOfferId }: { jobOfferId: string }) => {
  const { data: session } = useSession();
  const token = session?.jwtToken as string;
  const queryClient = useQueryClient();
  const subscriptionStatusQuery = useQuery(
    ['jobOffer', jobOfferId, 'subscriptions', 'self'],
    fetchJobOfferSubscriptionStatus({
      token,
      jobOfferId,
    }),
    {
      enabled: !!token,
    }
  );
  const isFollowed = subscriptionStatusQuery.data;

  const subscriptionMutation = useMutation(
    ['jobOffer', jobOfferId, 'subscribe'],
    changeSubscriptionStatus({
      accessToken: token,
      jobOfferId,
      currentSubscriptionStatus: isFollowed,
    }),
    {
      onError: (_error, _variables, restoreCache) => {
        restoreCache && restoreCache();
      },
      onMutate: () => {
        const cachedStatus = queryClient.getQueryData([
          'jobOffer',
          jobOfferId,
          'subscriptions',
          'self',
        ]);
        const cachedAmount = queryClient.getQueryData([
          'jobOffer',
          jobOfferId,
          'subscriptions',
          'amount',
        ]);
        const newStatus = !cachedStatus;
        queryClient.setQueryData(
          ['jobOffer', jobOfferId, 'subscriptions', 'self'],
          newStatus
        );
        queryClient.setQueryData(
          ['jobOffer', jobOfferId, 'subscriptions', 'amount'],
          (_: any) =>
            cachedStatus
              ? --(cachedAmount as number)
              : ++(cachedAmount as number)
        );

        return () => {
          queryClient.setQueryData(
            ['jobOffer', jobOfferId, 'subscriptions', 'self'],
            cachedStatus
          );
          queryClient.setQueryData(
            ['jobOffer', jobOfferId, 'subscriptions', 'amount'],
            cachedAmount
          );
        };
      },
      onSuccess: (_data, _variables, restoreCache) => {
        restoreCache && restoreCache();
        queryClient.setQueryData(
          ['jobOffer', jobOfferId, 'subscriptions', 'self'],
          (prev: any) => !(prev as boolean)
        );
        queryClient.setQueryData(
          ['jobOffer', jobOfferId, 'subscriptions', 'amount'],
          (prev: any) => (isFollowed ? --(prev as number) : ++(prev as number))
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries([
          'jobOffer',
          jobOfferId,
          'subscriptions',
        ]);
      },
    }
  );

  const clickHandler = (event: any) => {
    event.preventDefault();
    subscriptionMutation.mutate();
  };
  if (isFollowed) {
    return (
      <LinkButton
        onClick={clickHandler}
        style="dark-blue-secondary"
        additionalClasses={classes.btn}
      >
        <span className={classes['btn-content']}>
          <CheckIcon />
          {'Підписаний'}
        </span>
      </LinkButton>
    );
  }
  return (
    <LinkButton
      onClick={clickHandler}
      style="light-blue-primary"
      additionalClasses={classes.btn}
    >
      {'Підписатися'}
    </LinkButton>
  );
};
export default SubscriptionButton;
