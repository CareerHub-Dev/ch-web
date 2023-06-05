import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import { InferGetServerSidePropsType } from "next/types";
import CompanyProfile from "@/features/company-profile/components/CompanyProfile";

export default function CompanyDetailsPage({
  companyId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <CompanyProfile viewerRole="Student" companyId={companyId} />;
}
CompanyDetailsPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr<{ companyId: string }>({
  allowedRoles: ["Student"],
  getProps: async (context) => {
    const companyId = context.query.companyId;
    if (typeof companyId === "string") {
      return {
        props: { companyId },
      };
    }
    return { notFound: true };
  },
});
