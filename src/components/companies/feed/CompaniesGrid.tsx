import React from 'react';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import CompanyCard from './CompanyCard';
import classes from './CompaniesGrid.module.scss';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const CompaniesGrid: React.FC<{
  query: UseInfiniteQueryResult<
    {
      companies: any;
      nextPage: number | null;
    },
    any
  >;
}> = ({ query }) => {
  const { data, status, error } = query;
  return (
    <>
      {status === 'loading' ? (
        <div className="g__center">
          <LoadingSpinner />
        </div>
      ) : status === 'error' ? (
        <span>Помилка: {error.message}</span>
      ) : data?.pages[0]?.companies?.length ? (
        <div className="g__center">Нічого не знайдено</div>
      ) : (
        <div className={classes.grid}>
          {data.pages.map((page) => (
            <React.Fragment key={page.nextPage}>
              {page.companies.map((company: any) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};
export default CompaniesGrid;
