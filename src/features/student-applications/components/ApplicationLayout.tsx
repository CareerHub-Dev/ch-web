import StackedLayout from "@/components/layout/StackedLayout";
import Link from "next/link";
import { ReactNode } from "react";

export default function ApplicationLayout(props: {
  children: ReactNode;
  applicationId: string;
  applicationTitle: string;
  jobOfferId: string;
  jobOfferTitle: string;
  studentFullName: string;
}) {
  const jobOffersUrl = `/my-job-offers`;
  const jobOfferUrl = `/job-offers/${props.jobOfferId}?tab=cvs`;
  const applicationUrl = `/applications/${props.applicationId}`;

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
                  {props.jobOfferTitle}
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
                  href={applicationUrl}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current="page"
                >
                  {`${props.studentFullName}: ${props.applicationTitle}`}
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      }
    >
      {props.children}
    </StackedLayout>
  );
}
