import { protectedSsr } from "@/lib/protected-ssr";
import CommonLayout from "@/components/layout/CommonLayout";
import JobOffersFeed from "@/features/job-offers-feed/components/JobOffersFeed";

export default function StudentJobOffersPage() {
  return <JobOffersFeed />;
}

StudentJobOffersPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Student"],
});
