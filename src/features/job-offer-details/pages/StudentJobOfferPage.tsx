import JobOfferCompanyTabs from "../components/JobOfferCompanyTabs";
import JobOfferGeneralInfo from "../components/JobOfferGeneralInfo";
import JobOfferAsideInfo from "../components/JobOfferAsideInfo";
import JobOfferHeaderForStudent from "../components/JobOfferHeaderForStudent";
import { useCompanyJobOfferTabs } from "../hooks/use-company-job-offer-tabs";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { getJobOfferAsStudent } from "@/lib/api/job-offer";
import JobOfferApplicationsForStudent from "../components/JobOfferApplicationsForStudent";
import JobOfferGeneralInfoSkeleton from "../components/JobOfferGeneralInfoSkeleton";
import parseUnknownError from "@/lib/parse-unknown-error";
import JobOfferAsideInfoSkeleton from "../components/JobOfferAsideInfoSkeleton";
import JobOfferHeaderSkeleton from "../components/JobOfferHeaderSkeleton";

export default function StudentJobOfferPage({
  jobOfferId,
}: {
  jobOfferId: string;
}) {
  const { currentTab } = useCompanyJobOfferTabs();
  const {
    data: jobOffer,
    isLoading,
    isError,
    error,
  } = useProtectedQuery(
    ["job-offer", jobOfferId],
    getJobOfferAsStudent(jobOfferId)
  );
  return (
    <>
      {isLoading ? (
        <>
          <header className="relative isolate">
            <JobOfferHeaderSkeleton />
          </header>

          <div className="mx-auto bg-white rounded-md max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <aside className="lg:col-start-3 lg:row-end-1">
                <JobOfferAsideInfoSkeleton />
              </aside>
              <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                <JobOfferGeneralInfoSkeleton />
              </div>
            </div>
          </div>
        </>
      ) : isError ? (
        <p className="text-center text-red-600">{parseUnknownError(error)}</p>
      ) : (
        <>
          <header className="relative isolate">
            <JobOfferHeaderForStudent
              image={jobOffer.image}
              title={jobOffer.title}
              id={jobOfferId}
            />
          </header>

          <div className="mx-auto bg-white rounded-md max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <aside className="lg:col-start-3 lg:row-end-1">
                <JobOfferAsideInfo
                  tags={jobOffer.tags}
                  workFormat={jobOffer.workFormat}
                  jobType={jobOffer.jobType}
                  experienceLevel={jobOffer.experienceLevel}
                  jobPosition={jobOffer.jobPosition.name}
                  endDate={jobOffer.endDate}
                />
              </aside>
              <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                <JobOfferCompanyTabs jobOfferId={jobOfferId} />
                {currentTab === "cvs" ? (
                  <JobOfferApplicationsForStudent jobOfferId={jobOfferId} />
                ) : (
                  <JobOfferGeneralInfo
                    overview={jobOffer.overview}
                    requirements={jobOffer.requirements}
                    responsibilities={jobOffer.responsibilities}
                    preferences={jobOffer.preferences}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
