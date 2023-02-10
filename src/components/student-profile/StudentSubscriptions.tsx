import {
  getStudentCompanySubscriptionsAmount,
  getStudentStudentSubscriptionsAmount,
  getStudentJobOfferSubscriptionsAmount,
} from '@/lib/api/student';
import { useProtectedQuery } from '@/hooks/useProtectedQuery';

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
    <div className="text-white p-4 rounded-xl opacity-95 bg-gradient-to-r from-primaryBlue to-lightBlueAccent">
      <h2 className="mb-2">Підписки</h2>
      <p className="text-lightBlue">
        Студенти: {students.isLoading ? '...' : students.data}
      </p>
      <p className="text-lightBlue">
        Компанії: {companies.isLoading ? '...' : companies.data}
      </p>
      <p className="text-lightBlue">
        Вакансії: {jobOffers.isLoading ? '...' : jobOffers.data}
      </p>
      <p className="mt-2">Підписники: 0</p>
    </div>
  );
};
export default StudentSubscriptions;
