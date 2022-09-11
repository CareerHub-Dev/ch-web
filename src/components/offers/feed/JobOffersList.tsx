import { Fragment } from 'react';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import JobOfferItem from './JobOfferItem';
import classes from './JobOffersList.module.scss';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const JobOffersList: React.FC<{
  query: UseInfiniteQueryResult<
    {
      items: any;
      nextPage: number | null;
    },
    any
  >;
}> = ({ query }) => {
  const { status, data, error } = query;

  return (
    <>
      {status === 'loading' ? (
        <div className="g__center">
          <LoadingSpinner />
        </div>
      ) : status === 'error' ? (
        <div className="g__center">
          <p>{`Помилка: ${error.message}`}</p>
        </div>
      ) : !data?.pages[0]?.items?.length ? (
        <div className="g__center">
          <p>{`Нічого не знайдено`}</p>
        </div>
      ) : (
        <ul className={classes.list}>
          {data.pages.map((page) => (
            <Fragment key={page.nextPage}>
              {page.items.map((jobOffer: JobOffersFeed.JobOffer) => (
                <JobOfferItem key={jobOffer.id} item={jobOffer} />
              ))}
            </Fragment>
          ))}
        </ul>
      )}
    </>
  );
};
export default JobOffersList;
