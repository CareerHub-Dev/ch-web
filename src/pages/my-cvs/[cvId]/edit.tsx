import CvBuilder from "@/features/cv-builder/CvBuilder";
import StackedLayout from "@/components/layout/StackedLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import {
  useJobDirectionsQuery,
  useJobPositionsByJobDirectionQuery,
} from "@/hooks/requests/job-directions";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";
import { useCvDetailsQuery } from "@/features/student-cvs/hooks/use-cv-details-query";
import { useRouter } from "next/router";
import Link from "next/link";

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
    return (
      <StackedLayout>
        <CenteredLoadingSpinner />
      </StackedLayout>
    );
  }

  if (isErrorSomewhere) {
    return (
      <StackedLayout>
        <p className="text-center text-red-500">{`Помилка завантаження: ${parseUnknownError(
          error ?? jobDirectionsQuery ?? jobPositionsQuery
        )}`}</p>
      </StackedLayout>
    );
  }

  const cvsUrl = "/my-cvs";
  const cvUrl = `/my-cvs/${cvId}`;
  const cvTitle = data?.title;
  const cvsTitle = "Мої резюме";

  return (
    <StackedLayout
      breadCrumbs={
        <nav
          className="flex border-b border-gray-200 bg-white"
          aria-label="Breadcrumb"
        >
          <ol
            role="list"
            className="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 py-3 border-t border-gray-200 sm:px-6 lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <Link
                  href={cvsUrl}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {cvsTitle}
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>

                <Link
                  href={cvUrl}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {cvTitle}
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      }
    >
      <CvBuilder initialData={data} />
    </StackedLayout>
  );
}

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Student"],
});
