import {
  getStudentStudentSubscriptions,
  unsubscribeStudentFromStudent,
} from '@/lib/api/student';
import NoStudentSubscriptions from './NoStudentSubscriptions';
import StudentSubscriptionsList from './StudentSubscriptionsList';
import SubscriptionStudentItem from './SubscriptionStudentItem';

const StudentSubscriptionsStudents = (props: {
  accountId: string;
  isSelf: boolean;
  search: string;
  setSearch: (value: string) => void;
  debouncedSearchValue: string;
}) => {
  return (
    <StudentSubscriptionsList
      queryKey="studentStudentSubscriptions"
      amountQueryKey={'student-student-subscriptions-amount'}
      {...props}
      item={SubscriptionStudentItem}
      noItems={NoStudentSubscriptions}
      getItems={getStudentStudentSubscriptions}
      mutateItem={(jwt?: string) => (id: string) => {
        return new Promise<void>((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      }}
      extractItemName={(item) => `${item.firstName} ${item.lastName}`}
    />
  );
};
export default StudentSubscriptionsStudents;
