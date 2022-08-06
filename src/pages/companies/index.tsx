import useAuth from '@/hooks/useAuth';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCompanies } from '@/lib/api/remote/companies';
import CompaniesGrid from '@/components/companies/feed/CompaniesGrid';
import FeedWrapper from '@/components/layout/FeedWrapper';
import LoadMoreSection from '@/components/layout/LoadMoreSection';
import { GetServerSidePropsContext } from 'next';
import UserRole from '@/models/enums/UserRole';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';
import verifySessionData from '@/lib/api/local/helpers/verify-session-data';
const defaultPageSize = 50;

const CompaniesFeedPage = () => {
  const { accessToken } = useAuth();
  const searchTerm = ''; // dummy value
  const companiesQuery = useInfiniteQuery(
    ['companies'],
    async ({ pageParam = 1 }) =>
      await fetchCompanies({
        accessToken,
        pageNumber: pageParam,
        pageSize: defaultPageSize,
        searchTerm,
      })(),
    {
      enabled: accessToken !== null,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      onError: alert,
    }
  );

  const loadMore = (event: any) => {
    event.preventDefault();
    companiesQuery.hasNextPage && companiesQuery.fetchNextPage();
  };

  return (
    <>
      <FeedWrapper>
        <CompaniesGrid query={companiesQuery} />
      </FeedWrapper>
      {companiesQuery.hasNextPage && <LoadMoreSection onClick={loadMore} />}
    </>
  );
};
export default CompaniesFeedPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let accessAllowed = false;
  try {
    const sessionData = await verifySessionData(context.req);
    accessAllowed = verifyAuthority(sessionData, [UserRole.Student]);
  } catch {
    accessAllowed = false;
  }
  if (!accessAllowed) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
