import JobOffersFeedLayout from "./JobOffersFeedLayout";
import useSession from "@/hooks/useSession";
import JobOffersFeedTabs from "./JobOffersFeedTabs";
import CommonJobOffersFeed from "./CommonJobOffersFeed";
import { useJobOffersFeedTabs } from "../hooks/use-job-offers-feed-tabs";
import RecommendedJobOffersFeed from "./RecommendedJobOffersFeed";

export default function JobOffersFeed() {
  const { currentTab } = useJobOffersFeedTabs();
  const { data: sessionData, status: sessionStatus } = useSession();

  const isStudent =
    sessionStatus === "authenticated" && sessionData.role === "Student";

  return (
    <JobOffersFeedLayout>
      {isStudent ? <JobOffersFeedTabs /> : null}
      {isStudent && currentTab === "recommended" ? (
        <RecommendedJobOffersFeed />
      ) : (
        <CommonJobOffersFeed />
      )}
    </JobOffersFeedLayout>
  );
}
