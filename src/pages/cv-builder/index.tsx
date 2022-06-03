import CVControls from '@/components/cv-builder/CVControls';
import CVPreview from '@/components/cv-builder/CVPreview';
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
