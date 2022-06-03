import classes from './JobOfferTitle.module.scss';

type Props = { title: string };

const JobOfferTitle = ({ title }: Props) => (
  <section className={classes.title}>
    <h1>{title}</h1>
  </section>
);
export default JobOfferTitle;
