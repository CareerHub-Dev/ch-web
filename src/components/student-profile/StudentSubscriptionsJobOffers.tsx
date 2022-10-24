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
}) => {
  return (
    <StudentSubscriptionsList
      queryKey="studentJobOfferSubscriptions"
      amountQueryKey={'student-job-offer-subscriptions-amount'}
      {...props}
      item={SubscriptionJobOfferItem}
      noItems={NoJobOfferSubscriptions}
      getItems={getStudentJobOfferSubscriptions}
      mutateItem={(jwt?: string) => (id: string) => {
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
