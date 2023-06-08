import { ApplicationReviewDetails } from "../hooks/use-application-review-query";
import { getImageWithDefault } from "@/lib/api/image";
import format from "date-fns/format";
import Image from "next/image";
import Link from "next/link";
import {
  ReviewStatus,
  matchReviewStatus,
  reviewStatusToLocalizedString,
} from "@/lib/enums";
import AttachedCv from "./AttachedCv";
import {
  CheckCircleIcon,
  ClockIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { useBoolean } from "usehooks-ts";
import cn from "classnames";

const statusInferredProps = {
  [ReviewStatus.Success]: {
    className: "text-green-500",
    icon: CheckCircleIcon,
  },
  [ReviewStatus.Rejected]: { className: "text-red-500", icon: NoSymbolIcon },
  [ReviewStatus.InProgress]: { className: "text-blue-500", icon: ClockIcon },
};

export default function ApplicationReviewForCompany({
  cv,
  student,
  jobOffer,
  created,
  message,
  status,
}: ApplicationReviewDetails) {
  const previewModalIsOpen = useBoolean(false);
  const rejectModalIsOpen = useBoolean(false);
  const acceptModalIsOpen = useBoolean(false);

  const formattedCreationDate = format(new Date(created), "dd.MM.yyyy");
  const studentPhotoUrl = getImageWithDefault(student.photo, "Student");
  const studentFullName = `${student.firstName} ${student.lastName}`;
  const jobOfferTitle = jobOffer.title;
  const jobOfferUrl = `/job-offers/${jobOffer.id}`;
  const matchedStatus = matchReviewStatus(status);
  const localizedStatus = reviewStatusToLocalizedString(matchedStatus);
  const inferredProps = statusInferredProps[matchedStatus];
  const noFeedbackMessage = message === null || message.length === 0;

  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
        <div className="flex items-center space-x-5">
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                width={64}
                height={64}
                className="h-16 w-16 rounded-full"
                src={studentPhotoUrl}
                alt={studentFullName}
              />
              <span
                className="absolute inset-0 rounded-full shadow-inner"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {studentFullName}
            </h1>
            <p className="text-sm font-medium text-gray-500">
              {"Подання на "}
              <Link
                href={jobOfferUrl}
                className="text-gray-900 hover:underline hover:underline-offset-2"
              >
                {jobOfferTitle}
              </Link>
              {", "}
              <time dateTime={formattedCreationDate}>
                {formattedCreationDate}
              </time>
            </p>
          </div>
        </div>
        {matchedStatus === ReviewStatus.InProgress ? (
          <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-3 sm:space-y-0 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            <button
              id="reject-button"
              onClick={rejectModalIsOpen.setTrue}
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {"Відхилити"}
            </button>
            <button
              id="accept-button"
              onClick={acceptModalIsOpen.setTrue}
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {"Прийняти"}
            </button>
          </div>
        ) : null}
      </div>

      <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2 lg:col-start-1">
          <section aria-labelledby="applicant-information-title">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="applicant-information-title"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {"Інформація про кандидата"}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  {"Персональні дані кандидата"}
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {"Електронна пошта"}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {student.email}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      {"Відгук"}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {noFeedbackMessage ? "Немає відгуку" : message}
                    </dd>
                  </div>
                  {student.phone !== null && student.phone.length !== 0 ? (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        {"Телефон"}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {student.phone}
                      </dd>
                    </div>
                  ) : null}
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      {"Резюме"}
                    </dt>
                    <AttachedCv title={cv.title} id={cv.id} />
                  </div>
                </dl>
              </div>
              <div>
                <button
                  type="button"
                  onClick={previewModalIsOpen.setTrue}
                  className="w-full block bg-gray-50 px-4 py-4 text-center text-sm font-medium text-gray-500 hover:text-gray-700 sm:rounded-b-lg"
                >
                  {"Показати резюме"}
                </button>
              </div>
            </div>
          </section>
        </div>

        <section
          aria-labelledby="timeline-title"
          className="lg:col-span-1 lg:col-start-3"
        >
          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <h2
              id="timeline-title"
              className="text-lg font-medium text-gray-900"
            >
              {"Статус"}
            </h2>

            <div className="mt-6 flex space-x-3 pb-6">
              <div>
                <span
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                  )}
                >
                  <inferredProps.icon
                    className={cn("h-5 w-5", inferredProps.className)}
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p className="text-sm text-gray-500">{localizedStatus}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
