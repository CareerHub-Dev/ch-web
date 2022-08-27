import withVerification from '@/lib/with-verification';
import UserRole from '@/models/enums/UserRole';
import { GetServerSidePropsContext } from 'next/types';

const CompanyDashboard = () => {
  return <div>Company Dashboard</div>;
};
export default CompanyDashboard;

export const getServerSideProps = withVerification(
  (_context: GetServerSidePropsContext) => ({ props: {} }),
  [UserRole.Company]
);
