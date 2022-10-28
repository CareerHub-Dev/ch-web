import NoJobOfferSubscriptions from './NoJobOfferSubscriptions';
import StudentSubscriptionsList from './StudentSubscriptionsList';
import { getStudentJobOfferSubscriptions } from '@/lib/api/student';
import { unsubscribeStudentFromJobOffer } from '@/lib/api/job-offer';
import SubscriptionJobOfferItem from './SubscriptionJobOfferItem';

const StudentSubscriptionsJobOffers = (props: {
  accountId: string;
  isSelf: boolean;
  search: string;
  setSearch: (value: string) => void;
  debouncedSearchValue: string;
  orderByOptions: Array<{ label: string; value: string }>;
  selectedOrderByOption: { label: string; value: string };
  setSelectedOrderByOption: (option: { label: string; value: string }) => void;
}) => {
  return (
    <StudentSubscriptionsList
      queryKey="studentJobOfferSubscriptions"
      amountQueryKey={'student-job-offer-subscriptions-amount'}
      {...props}
      item={SubscriptionJobOfferItem}
      noItems={NoJobOfferSubscriptions}
      getItems={getStudentJobOfferSubscriptions}
      mutateItem={unsubscribeStudentFromJobOffer}
      extractItemName={(item) => item.id}
    />
  );
};
export default StudentSubscriptionsJobOffers;
