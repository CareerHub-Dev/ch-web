import StackedLayout from "@/components/layout/StackedLayout";
import ApplicationLayout from "@/features/student-applications/components/ApplicationLayout";
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
    return (
      <StackedLayout>
        <CenteredLoadingSpinner />
      </StackedLayout>
    );
  }

  if (isError) {
    return (
      <StackedLayout>
        <p className="text-center text-red-600">{parseUnknownError(error)}</p>
      </StackedLayout>
    );
  }

  return (
    <ApplicationLayout
      applicationId={data.id}
      applicationTitle={data.cv.title}
      jobOfferId={data.jobOffer.id}
      jobOfferTitle={data.jobOffer.title}
      studentFullName={`${data.student.firstName} ${data.student.lastName}`}
    >
      <ApplicationReviewForCompany {...data} />
    </ApplicationLayout>
  );
}

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
