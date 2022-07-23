import useAuth from '@/hooks/useAuth';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCompanies } from '@/lib/api/remote/companies';
import CompaniesGrid from '@/components/companies/feed/CompaniesGrid';
import FeedWrapper from '@/components/layout/FeedWrapper';
import LoadMoreSection from '@/components/layout/LoadMoreSection';
import { GetServerSidePropsContext } from 'next';
import UserRole from '@/models/enums/UserRole';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';
import verifySessionData from '@/lib/api/local/helpers/verify-session-data';

const DEFAULT_PAGE_SIZE = 50;

const CompaniesFeedPage = () => {
  const { accessToken } = useAuth();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const companiesQuery = useQuery(
    ['companies', page, searchTerm],
    fetchCompanies({
      token: accessToken as string,
      pageNumber: page,
      pageSize: DEFAULT_PAGE_SIZE,
      searchTerm,
    }),
    {
      enabled: accessToken !== null,
      onError: (err: any) =>
        alert(err.message || 'Помилка при завантаженні компаній'),
    }
  );

  return (
    <>
      <FeedWrapper>
        <CompaniesGrid query={companiesQuery} />
      </FeedWrapper>
      <LoadMoreSection />
    </>
  );
};
export default CompaniesFeedPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const sessionData = await verifySessionData(context.req);
  const accessAllowed = verifyAuthority(sessionData, [UserRole.Student]);

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
