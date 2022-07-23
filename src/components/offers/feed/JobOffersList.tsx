import type { UseQueryResult } from '@tanstack/react-query';
import FeedControls from '@/components/offers/feed/FeedControls';
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

  return (
    <ul className={classes.list}>
      {data.map((item: JobOffersFeed.JobOffer) => (
        <JobOfferItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
export default JobOffersList;
