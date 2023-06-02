import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";

export default function CvApplicationsPage() {
  return <h1>APPLICATIONS</h1>;
}

CvApplicationsPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Student"],
});
