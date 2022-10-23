import NoCompanySubscriptions from './NoCompanySubscriptions';
import SubscriptionCompanyItem from './SubscriptionCompanyItem';
import StudentSubscriptionsList from './StudentSubscriptionsList';
import { getStudentCompanySubscriptions } from '@/lib/api/student';

const StudentSubscriptionsCompanies = ({
  accountId,
  isSelf,
}: {
  accountId: string;
  isSelf: boolean;
}) => {
  return (
    <StudentSubscriptionsList
      queryKey="studentCompanySubscriptions"
      amountQueryKey={'student-company-subscriptions-amount'}
      accountId={accountId}
      isSelf={isSelf}
      item={SubscriptionCompanyItem}
      noItems={NoCompanySubscriptions}
      getItems={getStudentCompanySubscriptions}
      mutateItem={(jwt?: string) => (id: string) => {
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
