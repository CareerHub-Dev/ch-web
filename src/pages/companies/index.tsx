import useSession from '@/hooks/useSession';
import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCompanies } from '@/lib/api/remote/companies';
import CompaniesGrid from '@/components/companies/feed/CompaniesGrid';
import FeedWrapper from '@/components/layout/FeedWrapper';
import SearchPanel from '@/components/companies/feed/SearchPanel';
import LoadMoreSection from '@/components/layout/LoadMoreSection';
import { protectedSsr } from '@/lib/protected-ssr';

const defaultPageSize = 50;

const CompaniesFeedPage = () => {
  const { data: session } = useSession();
  const accessToken = session?.jwtToken as string;
  const [searchTerm, setSearchTerm] = useState('');
  const companiesQuery = useInfiniteQuery(
    [
      'companies',
      {
        searchTerm,
      },
    ],
    async ({ pageParam = 1 }) =>
      await fetchCompanies({
        accessToken,
        pageNumber: pageParam,
        pageSize: defaultPageSize,
        searchTerm,
      })(),
    {
      enabled: !!accessToken,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      onError: (error: any) => {
        alert && alert(error.message || 'Помилка при завантаженні компанії');
      },
    }
  );

  const loadMore = (event: any) => {
    event.preventDefault();
    companiesQuery.hasNextPage && companiesQuery.fetchNextPage();
  };

  return (
    <>
      <SearchPanel onChange={setSearchTerm} />
      <FeedWrapper>
        <CompaniesGrid query={companiesQuery} />
      </FeedWrapper>
      {companiesQuery.hasNextPage && <LoadMoreSection onClick={loadMore} />}
    </>
  );
};
export default CompaniesFeedPage;

export const getServerSideProps = protectedSsr({
  allowedRoles: ['Student', 'Company'],
});
