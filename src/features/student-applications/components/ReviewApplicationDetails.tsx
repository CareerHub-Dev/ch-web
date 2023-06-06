import format from "date-fns/format";
import { StudentApplicationReview } from "../hooks/use-student-reviews-query";
import Link from "next/link";
import {
  CheckCircleIcon,
  ClockIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import cn from "classnames";
import {
  ReviewStatus,
  matchReviewStatus,
  reviewStatusToLocalizedString,
} from "@/lib/enums";
import AttachedCv from "./AttachedCv";
import Image from "next/image";
import { getJobOfferLogo } from "@/lib/api/image";

const statusInferredProps = {
  [ReviewStatus.Success]: {
    className: "text-green-500",
    icon: CheckCircleIcon,
  },
  [ReviewStatus.Rejected]: { className: "text-red-500", icon: NoSymbolIcon },
  [ReviewStatus.InProgress]: { className: "text-blue-500", icon: ClockIcon },
};

export default function ReviewApplicationDetails({
  created,
  message,
  status,
  cv,
  jobOffer,
}: StudentApplicationReview) {
  const matchedStatus = matchReviewStatus(status);
  const localizedStatusName = reviewStatusToLocalizedString(matchedStatus);
  const inferredProps = statusInferredProps[matchedStatus];
  const formattedApplicationCreationDate = format(
    new Date(created),
    "dd.MM.yyyy"
  );
  const jobOfferUrl = `/job-offers/${jobOffer.id}`;
  const jobOfferImage = getJobOfferLogo(jobOffer.image, null);

  return (
    <div>
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <Image
              src={jobOfferImage}
              alt="Job offer logo"
              width={100}
              height={100}
              className="rounded-md ring-gray-100 ring-2"
            />
            <h2
              id="application-title"
              className="mt-2 text-lg font-medium leading-6 text-gray-900"
            >
              {"Подання на "}
              <Link
                href={jobOfferUrl}
                className="text-blue-600 hover:underline hover:underline-offset-2"
              >
                {jobOffer.title}
              </Link>
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              <time dateTime={created}>{formattedApplicationCreationDate}</time>
            </p>
          </div>
          <div className="flex items-center text-sm text-gray-500 ml-4 mt-4">
            <inferredProps.icon
              className={cn(
                "mr-1.5 h-5 w-5 flex-shrink-0",
                inferredProps.className
              )}
              aria-hidden="true"
            />
            {localizedStatusName}
          </div>
        </div>
      </div>

      <div className="px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">{"Відгук"}</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {message || "Немає відгуку"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">{"Резюме"}</dt>
            <AttachedCv id={cv.id} title={cv.title} />
          </div>
        </dl>
      </div>
    </div>
  );
}
