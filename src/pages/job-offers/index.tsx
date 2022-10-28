import useProtectedPaginatedQuery from '@/hooks/useProtectedPaginatedQuery';
import { useSelector } from 'react-redux';
import { selectFilterOptions } from '@/context/job-offers-feed';
import LoadMoreSection from '@/components/layout/LoadMoreSection';
import FeedWrapper from '@/components/layout/FeedWrapper';
import JobOffersFilters from '@/components/offers/feed/JobOfferFilters';
import JobOffersList from '@/components/offers/feed/JobOffersList';
import Head from 'next/head';
import CommonLayout from '@/components/layout/CommonLayout';
import { protectedSsr } from '@/lib/protected-ssr';
import { getJobOffers } from '@/lib/api/job-offer';

const JobOffersFeedPage: NextPageWithLayout = () => {
  const { filter, isApplied } = useSelector(selectFilterOptions);
  const queryKey: Array<string | object> = ['jobOffers'];
  if (isApplied && !!filter) {
    queryKey.push(filter);
  }

  const params = {
    pageSize: 25,
  };

  const jobOffersQuery = useProtectedPaginatedQuery({
    queryKey,
    getItems: getJobOffers,
    params,
  });

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

JobOffersFeedPage.getLayout = CommonLayout;

export default JobOffersFeedPage;

export const getServerSideProps = protectedSsr({
  allowedRoles: ['Student'],
});
