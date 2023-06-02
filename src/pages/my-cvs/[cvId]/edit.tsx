import CvBuilder from "@/features/cv-builder/CvBuilder";
import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import {
  useJobDirectionsQuery,
  useJobPositionsByJobDirectionQuery,
} from "@/hooks/requests/job-directions";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";
import { useCvDetailsQuery } from "@/features/student-cvs/hooks/use-cv-details-query";
import { useRouter } from "next/router";

export default function EditCvPage() {
  const cvId = useRouter().query.cvId as string;
  const { data, isLoading, isError, error } = useCvDetailsQuery(cvId);
  const {
    isLoading: isLoadingJobDirections,
    isError: isErrorJobDirections,
    error: jobDirectionsQuery,
  } = useJobDirectionsQuery();
  const {
    isLoading: isLoadingJobPositions,
    isError: isErrorJobPositions,
    error: jobPositionsQuery,
  } = useJobPositionsByJobDirectionQuery(data?.jobDirection.id ?? "", {
    enabled: data !== undefined,
  });

  const isLoadingSomething =
    isLoading || isLoadingJobDirections || isLoadingJobPositions;
  const isErrorSomewhere =
    isError || isErrorJobDirections || isErrorJobPositions;

  if (isLoadingSomething) {
    return <CenteredLoadingSpinner />;
  }

  if (isErrorSomewhere) {
    return (
      <p className="text-center text-red-500">{`Помилка завантаження: ${parseUnknownError(
        error ?? jobDirectionsQuery ?? jobPositionsQuery
      )}`}</p>
    );
  }

  return <CvBuilder initialData={data} />;
}

EditCvPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Student"],
});
