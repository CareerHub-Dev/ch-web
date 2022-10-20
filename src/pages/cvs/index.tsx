import { protectedSsr } from '@/lib/protected-ssr';

const CVs = () => {
  return <div>Cvs</div>;
};
export default CVs;

export const getServerSideProps = protectedSsr({
  allowedRoles: ['Company'],
});
