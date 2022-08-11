import CVControls from '@/components/cv-builder/CVControls';
import CVPreview from '@/components/cv-builder/CVPreview';
import UserRole from '@/models/enums/UserRole';
import { GetServerSidePropsContext } from 'next';
import withVerification from '@/lib/with-verification';

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

export const getServerSideProps = withVerification(
  (_context: GetServerSidePropsContext) => ({ props: {} }),
  [UserRole.Student]
);
