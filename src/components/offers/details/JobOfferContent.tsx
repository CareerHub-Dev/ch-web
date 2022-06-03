import ContentSection from './ContentSection';
import classes from './JobOfferContent.module.scss';

type Props = {
  overview: string;
  requirements: string;
  responsibilities: string;
};

const JobOfferContent = ({
  overview,
  requirements,
  responsibilities,
}: Props) => (
  <section className={classes.content}>
    <ContentSection title={`Огляд`} content={overview} />
    <ContentSection title={`Вимоги`} content={requirements} />
    <ContentSection title={`Обов'язки`} content={responsibilities} />
  </section>
);
export default JobOfferContent;
