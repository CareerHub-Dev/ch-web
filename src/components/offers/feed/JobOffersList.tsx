import type { JobOffersFeedItemProps } from '@/models/JobOffer';
import FeedControls from '@/components/offers/feed/FeedControls';
import JobOfferItem from './JobOfferItem';
import classes from './JobOffersList.module.scss';

type Props = {
  items: JobOffersFeedItemProps[];
};

const JobOffersList = ({ items }: Props) => {
  return (
    <>
      <ul className={classes.list}>
        {items.map((item) => (
          <JobOfferItem
            key={item.id}
            id={item.id}
            title={item.title}
            companyName={item.companyName}
            startDate={item.startDate}
            endDate={item.endDate}
            image={item.image}
            tags={item.tags}
          />
        ))}
      </ul>
    </>
  );
};
export default JobOffersList;
