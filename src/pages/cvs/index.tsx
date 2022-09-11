import withVerification from '@/lib/with-verification';
import UserRole from '@/models/enums/UserRole';
import { GetServerSidePropsContext } from 'next/types';

const CVs = () => {
  return <div>Cvs</div>;
};
export default CVs;

export const getServerSideProps = withVerification(
  (_context: GetServerSidePropsContext) => ({ props: {} }),
  [UserRole.Company]
);
