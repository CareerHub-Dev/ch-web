import NoCompanySubscriptions from './NoCompanySubscriptions';
import SubscriptionCompanyItem from './SubscriptionCompanyItem';
import StudentSubscriptionsList from './StudentSubscriptionsList';
import { getStudentCompanySubscriptions } from '@/lib/api/student';

const StudentSubscriptionsCompanies = (props: {
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
      queryKey="studentCompanySubscriptions"
      amountQueryKey={'student-company-subscriptions-amount'}
      {...props}
      item={SubscriptionCompanyItem}
      noItems={NoCompanySubscriptions}
      getItems={getStudentCompanySubscriptions}
      mutateItem={() => (id: string) => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      }}
      extractItemName={(item) => item.name}
    />
  );
};
export default StudentSubscriptionsCompanies;
