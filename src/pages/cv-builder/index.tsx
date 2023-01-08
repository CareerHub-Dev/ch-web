import CVControls from '@/components/cv-builder/CVControls';
import CVPreview from '@/components/cv-builder/CVPreview';
import CommonLayout from '@/components/layout/CommonLayout';

import classes from '@/styles/cv-builder.module.scss';

const CVBuilderPage = () => {
  return (
    <div id="cvPageWrapper" className={classes.wrapper}>
      <CVControls />
      <CVPreview />
    </div>
  );
};

CVBuilderPage.getLayout = CommonLayout;

export default CVBuilderPage;
