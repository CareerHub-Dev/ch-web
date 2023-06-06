import { CheckCircleIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import {
  ReviewStatus,
  matchReviewStatus,
  reviewStatusToLocalizedString,
} from "@/lib/enums";
import format from "date-fns/format";
import { StudentApplicationReview } from "../hooks/use-student-reviews-query";
import { ClockIcon } from "@heroicons/react/24/outline";
import cn from "classnames";
import Link from "next/link";
import ReviewActionsButton from "./ReviewActionsButton";

const statusInferredProps = {
  [ReviewStatus.Success]: {
    className: "text-green-500",
    icon: CheckCircleIcon,
  },
  [ReviewStatus.Rejected]: { className: "text-red-500", icon: NoSymbolIcon },
  [ReviewStatus.InProgress]: { className: "text-blue-500", icon: ClockIcon },
};

export default function StudentApplicationReviewItem({
  status,
  created,
  cv,
  jobOffer,
  onViewClick,
}: StudentApplicationReview & { onViewClick: () => void }) {
  const jobOfferUrl = `/job-offers/${jobOffer.id}`;
  const matchedStatus = matchReviewStatus(status);
  const inferredProps = statusInferredProps[matchedStatus];
  const localizedStatusName = reviewStatusToLocalizedString(matchedStatus);
  const formattedCreationDate = format(new Date(created), "dd.MM.yyyy");

  return (
    <li className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap">
      <div>
        <p className="text-sm font-semibold leading-6 text-gray-900">
          {cv.title}
        </p>
        <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
          <p>
            <Link href={jobOfferUrl} className="hover:underline">
              {jobOffer.title}
            </Link>
          </p>
          <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
            <circle cx={1} cy={1} r={1} />
          </svg>
          <p>
            <time dateTime={created}>{formattedCreationDate}</time>
          </p>
        </div>
      </div>

      <div className="flex w-full flex-none justify-between gap-x-4 sm:w-auto">
        <p className="flex items-center text-sm text-gray-500">
          <inferredProps.icon
            className={cn(
              "mr-1.5 h-5 w-5 flex-shrink-0",
              inferredProps.className
            )}
            aria-hidden="true"
          />
          {localizedStatusName}
        </p>
        <ReviewActionsButton onViewClick={onViewClick} />
      </div>
    </li>
  );
}
