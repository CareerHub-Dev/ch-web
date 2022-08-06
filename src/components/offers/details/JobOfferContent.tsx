import ContentSection from './ContentSection';
import classes from './JobOfferContent.module.scss';

const JobOfferContent = ({
  overview,
  requirements,
  responsibilities,
}: {
  overview: string;
  requirements: string;
  responsibilities: string;
}) => (
  <section className={classes.content}>
    <ContentSection title={`Огляд`} content={overview} />
    <ContentSection title={`Вимоги`} content={requirements} />
    <ContentSection title={`Обов'язки`} content={responsibilities} />
  </section>
);
export default JobOfferContent;
