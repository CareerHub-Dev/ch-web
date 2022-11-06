import { Fragment } from 'react';
import CompanyCard from './CompanyCard';

import { type InfiniteData } from '@tanstack/react-query';
import { type PaginatedResponse } from '@/lib/api/pagination';
import { type CompanyInFeedArray } from '@/lib/api/company/schemas';

const CompaniesGrid = ({
  data,
}: {
  data: InfiniteData<PaginatedResponse<CompanyInFeedArray>>;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8">
      {data.pages.map((page, pageIndex) => (
        <Fragment key={pageIndex}>
          {page.data.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </Fragment>
      ))}
    </div>
  );
};
export default CompaniesGrid;
