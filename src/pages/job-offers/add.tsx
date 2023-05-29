import JobOfferForm from "@/features/job-offer-form/JobOfferForm";
import CommonLayout from "@/components/layout/CommonLayout";
// import { protectedSsr } from "@/lib/protected-ssr";

export default function AddJobOfferPage() {
  return (
    <div className="bg-white rounded-md shadow-md">
      <JobOfferForm />
    </div>
  );
}

AddJobOfferPage.getLayout = CommonLayout;

// export const getServerSideProps = protectedSsr({
//     allowedRoles: ["Company"],
// });
