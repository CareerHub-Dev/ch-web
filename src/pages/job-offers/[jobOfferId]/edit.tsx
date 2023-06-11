import StackedLayout from "@/components/layout/StackedLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import { useJobOfferDetailsAsCompanyQuery } from "@/features/job-offer-details/hooks/use-job-offer-details-query";
import { InferGetServerSidePropsType } from "next";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";
import Link from "next/link";
import EditJobOfferDetailsForm from "@/features/job-offer-form/EditJobOfferDetailsForm";
import EditJobOfferImageForm from "@/features/job-offer-form/EditJobOfferImageForm";

export default function EditJobOfferPage({
  jobOfferId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading, isError, error } =
    useJobOfferDetailsAsCompanyQuery(jobOfferId);

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

  const jobOffersUrl = "/my-job-offers";
  const jobOfferUrl = `/job-offers/${jobOfferId}`;
  const jobOfferTitle = data.title;
  const jobOfferEditUrl = `/job-offers/${jobOfferId}/edit`;

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
                  href={jobOffersUrl}
                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {"Вакансії"}
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
                  href={jobOfferUrl}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  {jobOfferTitle}
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
                  href={jobOfferEditUrl}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current="page"
                >
                  {"Редагування"}
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      }
    >
      <div className="bg-white rounded-md shadow-md">
        <EditJobOfferImageForm initialImageId={data.image} jobOfferId={jobOfferId} />
        <EditJobOfferDetailsForm {...data} />
      </div>
    </StackedLayout>
  );
}

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Company"],
  getProps: async (context) => {
    const jobOfferId = context.query.jobOfferId;

    if (typeof jobOfferId !== "string") {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        jobOfferId,
      },
    };
  },
});
