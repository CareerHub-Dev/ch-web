import CVControls from '@/components/cv-builder/CVControls';
import CVPreview from '@/components/cv-builder/CVPreview';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';
import UserRole from '@/models/enums/UserRole';
import { GetServerSidePropsContext } from 'next';
import classes from '@/styles/cv-builder.module.scss';
import verifySessionData from '@/lib/api/local/helpers/verify-session-data';

const CVBuilderPage = () => {
  return (
    <div id="cvPageWrapper" className={classes.wrapper}>
      <CVControls />
      <CVPreview />
    </div>
  );
};
export default CVBuilderPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const sessionData = await verifySessionData(context.req);
  const accessAllowed = verifyAuthority(sessionData, [UserRole.Student]);

  if (!accessAllowed) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
