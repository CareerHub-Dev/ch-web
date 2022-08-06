import useAuth from '@/hooks/useAuth';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext, NextPage } from 'next';
import LoadMoreSection from '@/components/layout/LoadMoreSection';
import FeedWrapper from '@/components/layout/FeedWrapper';
import JobOffersFilters from '@/components/offers/feed/JobOffersFilters';
import JobOffersList from '@/components/offers/feed/JobOffersList';
import Head from 'next/head';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';
import UserRole from '@/models/enums/UserRole';
import verifySessionData from '@/lib/api/local/helpers/verify-session-data';
import { fetchJobOffers } from '@/lib/api/remote/jobOffers';
const defaultPageSize = 50;

const JobOffersFeedPage = () => {
  const { accessToken } = useAuth();
  const jobOffersQuery = useInfiniteQuery(
    ['jobOffers'],
    async ({ pageParam = 1 }) =>
      await fetchJobOffers({
        token: accessToken as string,
        pageNumber: pageParam,
        pageSize: defaultPageSize,
      })(),
    {
      enabled: accessToken !== null,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      onError: (err: any) =>
        alert(err.message || 'Помилка при завантаженні вакансій'),
    }
  );

  const loadMore = (event: any) => {
    event.preventDefault();
    jobOffersQuery.hasNextPage && jobOffersQuery.fetchNextPage();
  };

  return (
    <>
      <Head>
        <title>{'CareerHub: Вакансії'}</title>
        <meta
          name="description"
          content={`Вакансії на поточний час на CareerHub. Переглянути всі вакансії на поточний час.`}
        />
      </Head>
      <FeedWrapper>
        <JobOffersFilters />
        <JobOffersList query={jobOffersQuery} />
      </FeedWrapper>
      {jobOffersQuery.hasNextPage && <LoadMoreSection onClick={loadMore} />}
    </>
  );
};
export default JobOffersFeedPage;

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
