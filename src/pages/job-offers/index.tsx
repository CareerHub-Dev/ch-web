import useAuth from '@/hooks/useAuth';
import { useSelector } from 'react-redux';
import { selectFilterOptions } from '@/context/job-offers-feed';
import { useInfiniteQuery } from '@tanstack/react-query';
import LoadMoreSection from '@/components/layout/LoadMoreSection';
import FeedWrapper from '@/components/layout/FeedWrapper';
import JobOffersFilters from '@/components/offers/feed/JobOfferFilters';
import JobOffersList from '@/components/offers/feed/JobOffersList';
import Head from 'next/head';
import { fetchJobOffers } from '@/lib/api/remote/jobOffers';
import HorizontalNavbar from '@/components/layout/HorizontalNavbar';
import protectedSsr from '@/lib/protected-ssr';

const defaultPageSize = 50;

const JobOffersFeedPage: NextPageWithLayout = () => {
  const { session } = useAuth();
  const token = session?.jwtToken as string;
  const { filter, isApplied } = useSelector(selectFilterOptions);
  const queryKey: Array<string | object> = ['jobOffers'];
  if (isApplied && !!filter) {
    queryKey.push(filter);
  }
  const jobOffersQuery = useInfiniteQuery(
    queryKey,
    async ({ pageParam = 1 }) =>
      await fetchJobOffers({
        token,
        pageNumber: pageParam,
        pageSize: defaultPageSize,
        filter: isApplied ? filter! : undefined,
      })(),
    {
      enabled: !token,
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

JobOffersFeedPage.getLayout = (page) => (
  <>
    <HorizontalNavbar links={[]} />
    <main>{page}</main>
  </>
);

export default JobOffersFeedPage;

export const getServerSideProps = protectedSsr({
  allowedRoles: ['Student'],
})();
