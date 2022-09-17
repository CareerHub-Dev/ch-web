import protectedServerSideProps from '@/lib/protected-server-side-props';
import UserRole from '@/models/enums/UserRole';
import { GetServerSidePropsContext } from 'next/types';

const CompanyDashboard = () => {
  return <div>Company Dashboard</div>;
};
export default CompanyDashboard;

export const getServerSideProps = protectedServerSideProps([UserRole.Company]);
