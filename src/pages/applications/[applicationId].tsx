import CommonLayout from "@/components/layout/CommonLayout";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";
import { protectedSsr } from "@/lib/protected-ssr";
import { InferGetServerSidePropsType } from "next";
import { useReviewAsCompanyQuery } from "@/features/student-applications/hooks/use-application-review-query";
import ApplicationReviewForCompany from "@/features/student-applications/components/ApplicationReviewForCompany";

export default function ApplicationReviewPage({
  applicationId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading, isError, error } =
    useReviewAsCompanyQuery(applicationId);

  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }

  if (isError) {
    return (
      <p className="text-center text-red-600">{parseUnknownError(error)}</p>
    );
  }

  return <ApplicationReviewForCompany {...data} />;
}

ApplicationReviewPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr<{
  applicationId: string;
}>({
  allowedRoles: ["Company"],
  getProps: async (ctx) => {
    const applicationId = ctx.query.applicationId;

    if (typeof applicationId !== "string") {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        applicationId,
      },
    };
  },
});
