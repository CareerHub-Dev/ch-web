import type { UseQueryResult } from '@tanstack/react-query';
import JobOfferItem from './JobOfferItem';
import classes from './JobOffersList.module.scss';

const JobOffersList: React.FC<{
  query: UseQueryResult<any, any>;
}> = ({ query }) => {
  const { data, isLoading, isError } = query;
  if (isLoading) {
    return <div>Завантажуємо...</div>;
  }
  if (isError) {
    return <div>{`Помилка :(`}</div>;
  }
  console.log(data);

  const jobOffers = (data || []) as Array<JobOffersFeed.JobOffer>;

  return (
    <ul className={classes.list}>
      {jobOffers.map((item) => (
        <JobOfferItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
export default JobOffersList;
