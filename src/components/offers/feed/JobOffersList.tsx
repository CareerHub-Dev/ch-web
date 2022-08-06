import React from 'react';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import JobOfferItem from './JobOfferItem';
import classes from './JobOffersList.module.scss';

const JobOffersList: React.FC<{
  query: UseInfiniteQueryResult<
    {
      items: any;
      nextPage: number | null;
    },
    any
  >;
}> = ({ query }) => {
  const { status, data, error, isFetchingNextPage } = query;

  return (
    <>
      {status === 'loading' ? (
        <p>...</p>
      ) : status === 'error' ? (
        <span>Помилка: {error.message}</span>
      ) : (
        <ul className={classes.list}>
          {data.pages.map((page) => (
            <React.Fragment key={page.nextPage}>
              {page.items.map((jobOffer: JobOffersFeed.JobOffer) => (
                <JobOfferItem key={jobOffer.id} item={jobOffer} />
              ))}
            </React.Fragment>
          ))}
        </ul>
      )}
    </>
  );
};
export default JobOffersList;
