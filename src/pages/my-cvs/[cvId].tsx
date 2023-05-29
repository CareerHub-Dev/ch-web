import CvBuilder from "@/features/cv-builder/CvBuilder";
import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import { StudentCvDetails } from "@/lib/api/cvs/schemas";

const EditCvPage: NextPageWithLayout = function () {
  // TODO: fetch initial data from API
  return <CvBuilder initialData={{} as StudentCvDetails} />;
};

EditCvPage.getLayout = CommonLayout;

export default EditCvPage;

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Student"],
});
