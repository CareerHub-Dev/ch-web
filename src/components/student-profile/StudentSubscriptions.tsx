import {
  getStudentCompanySubscriptionsAmount,
  getStudentStudentSubscriptionsAmount,
  getStudentJobOfferSubscriptionsAmount,
} from '@/lib/api/remote/student';
import useProtectedQuery from '@/hooks/useProtectedQuery';

const StudentSubscriptions = ({ accountId }: { accountId: string }) => {
  const students = useProtectedQuery(
    ['student-student-subscriptions-amount', accountId],
    getStudentStudentSubscriptionsAmount(accountId),
    {}
  );
  const companies = useProtectedQuery(
    ['student-company-subscriptions-amount', accountId],
    getStudentCompanySubscriptionsAmount(accountId),
    {}
  );
  const jobOffers = useProtectedQuery(
    ['student-job-offer-subscriptions-amount', accountId],
    getStudentJobOfferSubscriptionsAmount(accountId),
    {}
  );

  return (
    <div className="bg-primaryBlue text-white p-4 rounded-xl">
      <h2 className="mb-4">Підписки</h2>
      <p className="text-lightBlue">
        Студенти: {students.isLoading ? '...' : students.data}
      </p>
      <p className="text-lightBlue">
        Компанії: {companies.isLoading ? '...' : companies.data}
      </p>
      <p className="text-lightBlue">
        Вакансії: {jobOffers.isLoading ? '...' : jobOffers.data}
      </p>
    </div>
  );
};
export default StudentSubscriptions;