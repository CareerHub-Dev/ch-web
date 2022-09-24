import protectedServerSideProps from '@/lib/protected-server-side-props';
import UserRole from '@/models/enums/UserRole';
import { GetServerSidePropsContext } from 'next/types';

const CompanyDashboard = () => {
  return (
    <div className="g__center p-5 m-5 font-bold">
      Company Dashboard: In progress (components/company-dashboard/index.tsx)
    </div>
  );
};
export default CompanyDashboard;

export const getServerSideProps = protectedServerSideProps([UserRole.Company]);
