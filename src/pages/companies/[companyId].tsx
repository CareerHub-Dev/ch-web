import { useState } from 'react';
import { NextPage } from 'next';
import CompanyHeader from '@/components/companies/details/CompanyHeader';
import CompanyBody from '@/components/companies/details/CompanyBody';

const DUMMY_DATA = {
  companyId: '1',
  companyName: 'Company 1',
  companyDescription: 'Spinner Vape kuk',
  companyLogo: 'https://i.imgur.com/XqY6xjq.png',
  totalSubscribers: 12,
  totalJobOffers: 2,
};

const CompanyDetailsPage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState('info');

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <>
      <h1>Company Details</h1>
      {/* <CompanyHeader
        onTabChange={handleTabChange}
        currentTab={currentTab}
        primaryColor="#c20a0a"
        secondaryColor="#ffc8c8"
      />
      <CompanyBody currentTab={currentTab} /> */}
    </>
  );
};
export default CompanyDetailsPage;
