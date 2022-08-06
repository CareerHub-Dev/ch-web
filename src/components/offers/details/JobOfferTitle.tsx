import classes from './JobOfferTitle.module.scss';

const JobOfferTitle = ({ title }: { title: string }) => (
  <section className={classes.title}>
    <h1>{title}</h1>
  </section>
);
export default JobOfferTitle;
