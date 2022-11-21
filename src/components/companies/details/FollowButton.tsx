import useProtectedQuery from '@/hooks/useProtectedQuery';
import useToast from '@/hooks/useToast';
import useProtectedMutation from '@/hooks/useProtectedMutation';
import { useQueryClient } from '@tanstack/react-query';
import {
  getSubscriptionOnCompany,
  changeCompanySubscriptionStatus,
} from '@/lib/api/company';
import { UserPlusIcon } from '@heroicons/react/24/outline';

import cn from 'classnames';

const FollowButton = ({ companyId }: { companyId: string }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const subscriptionStatusQuery = useProtectedQuery(
    ['company', companyId, 'subscriptions', 'self'],
    getSubscriptionOnCompany(companyId)
  );
  const currentlySubscribed = subscriptionStatusQuery.data;

  const subscriptionMutation = useProtectedMutation(
    ['company', companyId, 'subscribe'],
    changeCompanySubscriptionStatus(currentlySubscribed)(companyId),
    {
      onError: (_error, _variables, restoreCache) => {
        restoreCache && restoreCache();
        toast.error('Помилка при зміні статусу підписки на компанію');
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
              ? (cachedAmount as number) - 1
              : (cachedAmount as number) + 1
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
          (prev: any) =>
            currentlySubscribed ? --(prev as number) : ++(prev as number)
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries(['company', companyId, 'subscriptions']);
      },
    }
  );

  const buttonText = subscriptionStatusQuery.isLoading
    ? '...'
    : currentlySubscribed
    ? 'Відписатися'
    : 'Підписатися';

  const click = () => {
    subscriptionMutation.mutate();
  };

  return (
    <button
      onClick={click}
      className={cn(
        'flex items-center justify-center gap-4 rounded-lg bg-lightBlueAccent text-darkerBlue py-2 px-4 tracking-wide',
        subscriptionStatusQuery.isLoading && 'animate-pulse'
      )}
    >
      <UserPlusIcon className="w-6 h-6 text-darkerBlue" title="Підписатися" />
      <p>{buttonText}</p>
    </button>
  );
};

export default FollowButton;
