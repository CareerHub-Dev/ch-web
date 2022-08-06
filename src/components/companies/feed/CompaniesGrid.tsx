import React from 'react';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';
import CompanyCard from './CompanyCard';
import classes from './CompaniesGrid.module.scss';

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
    <div className={classes.grid}>
      {status === 'loading' ? (
        <p>...</p>
      ) : status === 'error' ? (
        <span>Помилка: {error.message}</span>
      ) : (
        <>
          {data.pages.map((page) => (
            <React.Fragment key={page.nextPage}>
              {page.companies.map((company: any) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};
export default CompaniesGrid;
