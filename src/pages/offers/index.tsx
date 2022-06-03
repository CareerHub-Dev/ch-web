import { useState } from 'react';
import { NextPage } from 'next';
import LoadMoreSection from '@/components/layout/LoadMoreSection';
import FeedWrapper from '@/components/layout/FeedWrapper';
import JobOffersFilters from '@/components/offers/feed/JobOffersFilters';
import JobOffersList from '@/components/offers/feed/JobOffersList';
import Head from 'next/head';

const DUMMY_DATA = [
  {
    id: '1',
    title: 'Junior JavaScript Developer',
    companyName: 'DataArt',
    startDate: '2022-01-22',
    endDate: '2022-02-22',
    image: 'https://picsum.photos/200/300',
    tags: ['JavaScript', 'React', 'Node.js'],
  },
  {
    id: '2',
    title: '.NET Trainee',
    companyName: 'NIX',
    startDate: '2022-01-22',
    endDate: '2022-02-22',
    image: 'https://picsum.photos/200/300',
    tags: [
      'DotNet',
      'C#',
      'ASP.NET',
      'MVC',
      'MSSQL',
      'EF',
      'SQL Server',
      'LINQ',
      '.NET',
    ],
  },
  {
    id: '3',
    title: '.NET Junior Developer',
    companyName: 'NIX',
    startDate: '2022-01-22',
    endDate: '2022-02-22',
    image: 'https://picsum.photos/200/300',
    tags: [],
  },
  {
    id: '4',
    title: 'Java Automation QA',
    companyName: 'GlobalLogic',
    startDate: '2022-01-22',
    endDate: '2022-02-22',
    image: 'https://picsum.photos/200/300',
    tags: [],
  },
];

const dummyLoad = () => {
  return DUMMY_DATA.map((item) => ({
    ...item,
    id: (Math.random() * 100).toString(),
  }));
};

const JobOffersFeedPage: NextPage = () => {
  const [jobOffers, setJobOffers] = useState(DUMMY_DATA);
  const [filterApplied, setFilterApplied] = useState(false);

  const filterApplyHandler = (filter: {
    title: string;
    companyName: string;
    formats: Array<string>;
    categories: Array<string>;
    tags: Array<string>;
  }) => {
    let { title, companyName, formats, categories, tags } = filter;
    title = title.trim();
    companyName = companyName.trim();
    const filterIsInvalid =
      title.length === 0 &&
      companyName.length === 0 &&
      formats.length === 0 &&
      categories.length === 0 &&
      tags.length === 0;
    if (filterIsInvalid) {
      return;
    }

    console.log(filter);
    setFilterApplied(true);
  };

  const loadMoreHandler = () => {
    setJobOffers([...jobOffers, ...dummyLoad()]);
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
        <JobOffersList items={jobOffers} />
      </FeedWrapper>
      <LoadMoreSection onClick={loadMoreHandler} />
    </>
  );
};
export default JobOffersFeedPage;
