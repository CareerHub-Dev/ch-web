import { useState } from 'react';
import CompaniesGrid from '@/components/companies/feed/CompaniesGrid';
import FeedWrapper from '@/components/layout/FeedWrapper';
import LoadMoreSection from '@/components/layout/LoadMoreSection';
import { GetServerSidePropsContext } from 'next';
import UserRole from '@/models/enums/UserRole';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';
import verifySessionData from '@/lib/api/local/helpers/verify-session-data';

const DUMMY_DATA = [
  {
    companyId: '1',
    companyName: 'Company 1',
    companyDescription: 'Spinner Vape kuk',
    companyLogo: 'https://i.imgur.com/XqY6xjq.png',
    totalSubscribers: 12,
    totalJobOffers: 2,
  },
  {
    companyId: '2',
    companyName: 'Company 2',
    companyDescription: 'Spinner Vape kuk2',
    companyLogo: 'https://i.imgur.com/XqY6xjq.png',
    totalSubscribers: 0,
    totalJobOffers: 0,
  },
  {
    companyId: '3',
    companyName: 'Company 3',
    companyDescription: 'Spinner Vape kuk3',
    companyLogo: 'https://i.imgur.com/XqY6xjq.png',
    totalSubscribers: 3,
    totalJobOffers: 3,
  },
  {
    companyId: '4',
    companyName: 'Company 4',
    companyDescription: 'Spinner Vape kuk4',
    companyLogo: 'https://i.imgur.com/XqY6xjq.png',
    totalSubscribers: 0,
    totalJobOffers: 4,
  },
];

const CompaniesFeedPage = () => {
  const [companies, setCompanies] = useState(DUMMY_DATA);

  return (
    <>
      <FeedWrapper>
        <CompaniesGrid companies={companies} />
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
