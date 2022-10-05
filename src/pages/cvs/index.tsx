import protectedServerSideProps from '@/lib/protected-server-side-props';

const CVs = () => {
  return <div>Cvs</div>;
};
export default CVs;

export const getServerSideProps = protectedServerSideProps(['Company']);
