import CVControls from '@/components/cv-builder/CVControls';
import CVPreview from '@/components/cv-builder/CVPreview';
import UserRole from '@/lib/enums/UserRole';
import protectedServerSideProps from '@/lib/protected-server-side-props';

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

export const getServerSideProps = protectedServerSideProps([UserRole.Student]);
