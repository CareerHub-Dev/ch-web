import CVControls from '@/components/cv-builder/CVControls';
import CVPreview from '@/components/cv-builder/CVPreview';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';
import UserRole from '@/model/enums/UserRole';
import { GetServerSidePropsContext } from 'next';
import classes from '@/styles/cv-builder.module.scss';

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
  const accessAllowed = await verifyAuthority(context.req, [UserRole.Student]);

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
