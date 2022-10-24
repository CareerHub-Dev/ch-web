import useSession from '@/hooks/useSession';
import { useQuery } from '@tanstack/react-query';
import { fetchJobOfferDetails } from '@/lib/api/remote/jobOffers';
import { useRouter } from 'next/router';
import Head from 'next/head';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import GeneralInfo from '@/components/offers/details/GeneralInfo';
import JobOfferTitle from '@/components/offers/details/JobOfferTitle';
import JobOfferContent from '@/components/offers/details/JobOfferContent';
import { protectedSsr } from '@/lib/protected-ssr';

const JobOfferDetailPage = () => {
  const { data: session } = useSession();
  const token = session?.jwtToken as string;
  const { jobOfferId } = useRouter().query;
  const jobOfferQuery = useQuery(
    ['jobOfferDetails', jobOfferId],
    fetchJobOfferDetails({
      token,
      jobOfferId: jobOfferId as string,
    }),
    {
      enabled: !!token,
      onError: (err: any) => {
        alert && alert(err.message);
      },
    }
  );

  if (jobOfferQuery.isLoading) {
    return (
      <div className="g__center">
        <LoadingSpinner />
      </div>
    );
  }

  if (jobOfferQuery.isError) {
    return (
      <div className="g__center">
        <p>Помилка при завантаженні вакансії</p>
      </div>
    );
  }

  const jobOffer = jobOfferQuery.data as JobOfferDetails.JobOffer;
  console.log(jobOffer);

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
        companyId={jobOffer.companyId}
        companyName={jobOffer.companyName}
        startDate={jobOffer.startDate}
        endDate={jobOffer.endDate}
        tags={jobOffer.tags}
        workFormat={jobOffer.workFormat}
        experienceLevel={jobOffer.experienceLevel}
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

export const getServerSideProps = protectedSsr({
  allowedRoles: ['Student'],
});
