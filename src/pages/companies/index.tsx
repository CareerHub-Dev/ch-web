import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { getCompanies } from '@/lib/api/company';
import useProtectedPaginatedQuery from '@/hooks/useProtectedPaginatedQuery';
import SearchPanel from '@/components/companies/feed/SearchPanel';
import LoadMore from '@/components/ui/LoadMore';
import { protectedSsr } from '@/lib/protected-ssr';
import CommonLayout from '@/components/layout/CommonLayout';
import parseUnknownError from '@/lib/parse-unknown-error';
import createAxiosInstance from '@/lib/axios/create-instance';
import CompaniesGrid from '@/components/companies/feed/CompaniesGrid';
import WrappedSpinner from '@/components/companies/feed/WrappedSpinner';

import { type CompanyInFeedArray } from '@/lib/api/company/schemas';
import { type PaginatedResponse } from '@/lib/api/pagination';
import { type InferGetServerSidePropsType } from 'next';

const CompaniesFeedPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ initialData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isError,
    error,
    isFetchingNextPage,
  } = useProtectedPaginatedQuery({
    queryKey: ['companies'],
    getItems: getCompanies,
    params: {
      pageSize: 25,
      searchTerm: debouncedSearchTerm,
    },
    initialData: initialData ?? undefined,
  });

  const loadMore = () => {
    hasNextPage && fetchNextPage();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white py-4 shadow-md rounded-b-md mb-4">
      <SearchPanel value={searchTerm} onChange={setSearchTerm} />
      <div className="mt-8 px-2 md:px-8">
        {isLoading ? (
          <WrappedSpinner />
        ) : isError ? (
          <p>{parseUnknownError(error)}</p>
        ) : (
          <CompaniesGrid data={data} />
        )}
      </div>

      {isFetchingNextPage ? (
        <WrappedSpinner />
      ) : hasNextPage ? (
        <LoadMore onClick={loadMore} />
      ) : null}
    </div>
  );
};

CompaniesFeedPage.getLayout = CommonLayout;

export default CompaniesFeedPage;

export const getServerSideProps = protectedSsr<{
  initialData: {
    pages: PaginatedResponse<CompanyInFeedArray>[];
    pageParams: { pageSize: number; searchTerm: string }[];
  } | null;
}>({
  allowedRoles: ['Student', 'Company'],
  getProps: async (context) => {
    const params = { pageSize: 25, searchTerm: '' };
    try {
      const data = await getCompanies(params)(
        createAxiosInstance({ data: context.session })
      );

      return {
        props: {
          initialData: { pages: [data], pageParams: [params] },
        },
      };
    } catch (error) {
      return {
        props: {
          initialData: null,
        },
      };
    }
  },
});
