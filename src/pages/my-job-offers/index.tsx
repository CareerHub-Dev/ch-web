import { protectedSsr } from "@/lib/protected-ssr";
import CommonLayout from "@/components/layout/CommonLayout";
import JobOffersFeed from "@/features/job-offers-feed/components/JobOffersFeed";

export default function CompanyJobOffersPage() {
  return <JobOffersFeed />;
}

CompanyJobOffersPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Company"],
});
