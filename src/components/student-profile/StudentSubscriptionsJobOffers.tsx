import NoJobOfferSubscriptions from './NoJobOfferSubscriptions';
import StudentSubscriptionsList from './StudentSubscriptionsList';
import { getStudentJobOfferSubscriptions } from '@/lib/api/student';
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
      mutateItem={() => (id: string) => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      }}
      extractItemName={(item) => item.id}
    />
  );
};
export default StudentSubscriptionsJobOffers;
