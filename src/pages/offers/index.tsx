import useAuth from '@/hooks/useAuth';
import { useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import LoadMoreSection from '@/components/layout/LoadMoreSection';
import FeedWrapper from '@/components/layout/FeedWrapper';
import JobOffersFilters from '@/components/offers/feed/JobOffersFilters';
import JobOffersList from '@/components/offers/feed/JobOffersList';
import Head from 'next/head';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';
import UserRole from '@/models/enums/UserRole';
import verifySessionData from '@/lib/api/local/helpers/verify-session-data';
import { useQuery } from '@tanstack/react-query';
import { fetchJobOffers } from '@/lib/api/remote/jobOffers';

const JobOffersFeedPage: NextPage = () => {
  const { accessToken } = useAuth();
  const [page, setPage] = useState(1);
  const [filterApplied, setFilterApplied] = useState(false);
  const jobOffersQuery = useQuery(
    ['jobOffers', page],
    fetchJobOffers({
      token: accessToken as string,
      pageNumber: page,
    }),
    {
      enabled: accessToken !== null,
      onError: (err: any) =>
        alert(err.message || 'Помилка при завантаженні вакансій'),
    }
  );

  const filterApplyHandler = (filter: JobOfferFilter) => {
    // title = title.trim();
    // companyName = companyName.trim();
    // const filterIsInvalid =
    //   title.length === 0 &&
    //   companyName.length === 0 &&
    //   formats.length === 0 &&
    //   categories.length === 0 &&
    //   tags.length === 0;
    // if (filterIsInvalid) {
    //   return;
    // }

    console.log(filter);
    setFilterApplied(true);
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
        <JobOffersFilters
          onApply={filterApplyHandler}
          applied={filterApplied}
        />
        <JobOffersList query={jobOffersQuery} />
      </FeedWrapper>
      <LoadMoreSection onClick={() => {}} />
    </>
  );
};
export default JobOffersFeedPage;

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
