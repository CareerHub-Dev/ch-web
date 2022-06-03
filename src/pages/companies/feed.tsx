import { useState } from 'react';
import type { NextPage } from 'next';
import CompaniesGrid from '@/components/companies/feed/CompaniesGrid';
import FeedWrapper from '@/components/layout/FeedWrapper';
import LoadMoreSection from '@/components/layout/LoadMoreSection';

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

const CompaniesFeedPage: NextPage = () => {
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
