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
  orderByOptions: Array<{ label: string; value: string }>;
  selectedOrderByOption: { label: string; value: string };
  setSelectedOrderByOption: (option: { label: string; value: string }) => void;
}) => {
  return (
    <StudentSubscriptionsList
      queryKey="studentStudentSubscriptions"
      amountQueryKey={'student-student-subscriptions-amount'}
      {...props}
      item={SubscriptionStudentItem}
      noItems={NoStudentSubscriptions}
      getItems={getStudentStudentSubscriptions}
      mutateItem={unsubscribeStudentFromStudent}
      extractItemName={(item) => `${item.firstName} ${item.lastName}`}
    />
  );
};
export default StudentSubscriptionsStudents;
