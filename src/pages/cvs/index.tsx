import protectedServerSideProps from '@/lib/protected-server-side-props';
import UserRole from '@/models/enums/UserRole';

const CVs = () => {
  return <div>Cvs</div>;
};
export default CVs;

export const getServerSideProps = protectedServerSideProps([UserRole.Company]);
