import useAuth from '@/hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectFilterOptions } from '@/store/job-offers-feed';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import LoadMoreSection from '@/components/layout/LoadMoreSection';
import FeedWrapper from '@/components/layout/FeedWrapper';
import JobOffersFilters from '@/components/offers/feed/JobOfferFilters';
import JobOffersList from '@/components/offers/feed/JobOffersList';
import Head from 'next/head';
import UserRole from '@/models/enums/UserRole';
import { fetchJobOffers } from '@/lib/api/remote/jobOffers';
import protectedServerSideProps from '@/lib/protected-server-side-props';
const defaultPageSize = 50;

const JobOffersFeedPage = () => {
  const { accessToken } = useAuth();
  const { filter, isApplied } = useSelector(selectFilterOptions);
  const queryKey: Array<string | object> = ['jobOffers'];
  if (isApplied && !!filter) {
    queryKey.push(filter);
  }
  const jobOffersQuery = useInfiniteQuery(
    queryKey,
    async ({ pageParam = 1 }) =>
      await fetchJobOffers({
        token: accessToken as string,
        pageNumber: pageParam,
        pageSize: defaultPageSize,
        filter: isApplied ? filter! : undefined,
      })(),
    {
      enabled: !!accessToken,
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

export const getServerSideProps = protectedServerSideProps([UserRole.Student]);
