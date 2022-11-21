import NoCompanySubscriptions from './NoCompanySubscriptions';
import SubscriptionCompanyItem from './SubscriptionCompanyItem';
import StudentSubscriptionsList from './StudentSubscriptionsList';
import { getStudentCompanySubscriptions } from '@/lib/api/student';
import { unsubscribeStudentFromCompanyById } from '@/lib/api/company';

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
      mutateItem={unsubscribeStudentFromCompanyById}
      extractItemName={(item) => item.name}
    />
  );
};
export default StudentSubscriptionsCompanies;
