import CVControls from '@/components/cv-builder/CVControls';
import CVPreview from '@/components/cv-builder/CVPreview';
import { protectedSsr } from '@/lib/protected-ssr';

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

export const getServerSideProps = protectedSsr({
  allowedRoles: ['Student'],
});
