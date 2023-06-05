import { AppliedCv } from "@/lib/api/job-offer/schemas";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import { matchReviewStatus, reviewStatusToLocalizedString } from "@/lib/enums";
import format from "date-fns/format";
import Link from "next/link";

export default function JobOfferApplicationItem({
  status,
  id,
  created,
  title,
  experienceLevel,
}: AppliedCv) {
  const applicationUrl = `/applications/${id}`;

  return (
    <Link href={applicationUrl} className="group block">
      <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <p className="truncate text-sm font-medium text-blue-600">
                {title}
              </p>
              <p className="mt-2 flex items-center text-sm text-gray-500">
                <ChevronDoubleUpIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <span className="truncate">{experienceLevel}</span>
              </p>
            </div>
            <div className="hidden md:block">
              <div>
                <p className="text-sm text-gray-900">
                  {"Подано "}
                  <time dateTime={created}>
                    {format(new Date(created), "dd MMM yyyy")}
                  </time>
                </p>
                <p className="mt-2 flex items-center text-sm text-gray-500">
                  <CheckCircleIcon
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                    aria-hidden="true"
                  />
                  {reviewStatusToLocalizedString(matchReviewStatus(status))}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ChevronRightIcon
            className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
