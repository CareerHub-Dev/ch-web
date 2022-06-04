import Head from 'next/head';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import GeneralInfo from '@/components/offers/details/GeneralInfo';
import JobOfferTitle from '@/components/offers/details/JobOfferTitle';
import JobOfferContent from '@/components/offers/details/JobOfferContent';
import { GetServerSidePropsContext } from 'next';
import UserRole from '@/model/enums/UserRole';
import verifyAuthority from '@/lib/api/local/helpers/verify-authority';

const DUMMY_DATA = {
  id: '1',
  title: 'JavaScript trainee',
  companyName: 'Google',
  startDate: '2020-01-01',
  endDate: '2020-01-01',
  image: 'https://i.imgur.com/TCemmcW.png',
  subscribersCount: 0,
  isSubscribed: false,
  overview:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  requirements:
    '# Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  responsibilities:
    '## Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};

const JobOfferDetailPage = () => {
  const jobOffer = DUMMY_DATA;

  if (!jobOffer) {
    return (
      <div className="g__center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{jobOffer.title}</title>
        <meta
          name="description"
          content={`${jobOffer.companyName}; Пропозиція: ${jobOffer.title}`}
        />
      </Head>
      <JobOfferTitle title={jobOffer.title} />
      <GeneralInfo
        jobOfferId={jobOffer.id}
        companyName={jobOffer.companyName}
        startDate={jobOffer.startDate}
        endDate={jobOffer.endDate}
        subscribersCount={jobOffer.subscribersCount}
        isSubscribed={jobOffer.isSubscribed}
        image={jobOffer.image}
      />
      <JobOfferContent
        overview={jobOffer.overview}
        requirements={jobOffer.requirements}
        responsibilities={jobOffer.responsibilities}
      />
    </>
  );
};
export default JobOfferDetailPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const accessAllowed = await verifyAuthority(context.req, [UserRole.Student]);

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
