import { Fragment } from 'react';
import JobOfferItem from './JobOfferItem';
import classes from './JobOffersList.module.scss';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { PaginatedResponse } from '@/lib/api/pagination';

import type { JobOfferFeed } from '@/lib/api/job-offer/schemas';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';

const JobOffersList = ({
  query,
}: {
  query: UseInfiniteQueryResult<PaginatedResponse<JobOfferFeed>>;
}) => {
  const { status, data, error } = query;

  return (
    <>
      {status === 'loading' ? (
        <div className="mt-12 mx-auto">
          <LoadingSpinner />
        </div>
      ) : status === 'error' ? (
        <div className="flex justify-center mt-12">
          <p>{`Помилка: ${error}`}</p>
        </div>
      ) : data.pages.at(0)?.data.length === 0 ? (
        <div className="flex justify-center mt-12">
          <p>{`Нічого не знайдено`}</p>
        </div>
      ) : (
        <ul className={classes.list}>
          {data.pages.map((page) => (
            <Fragment key={page.pagination.CurrentPage}>
              {page.data.map((jobOffer) => (
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
