import { AppliedCvWithStudent } from "@/lib/api/job-offer/schemas";
import {
  CheckCircleIcon,
  NoSymbolIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import {
  ReviewStatus,
  matchReviewStatus,
  reviewStatusToLocalizedString,
} from "@/lib/enums";
import format from "date-fns/format";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { getImageWithDefault } from "@/lib/api/image";

const statusInferredProps = {
  [ReviewStatus.Success]: {
    className: "text-green-500",
    icon: CheckCircleIcon,
  },
  [ReviewStatus.Rejected]: { className: "text-red-500", icon: NoSymbolIcon },
  [ReviewStatus.InProgress]: { className: "text-blue-500", icon: ClockIcon },
};

export default function JobOfferApplicationItem({
  status,
  reviewId,
  created,
  student,
}: AppliedCvWithStudent) {
  const applicationUrl = `/applications/${reviewId}`;
  const inferredProps = statusInferredProps[matchReviewStatus(status)];
  const { firstName, lastName, photo, email } = student;
  const fullName = `${firstName} ${lastName}`;
  const studentPhotoSource = getImageWithDefault(photo, "Student");

  return (
    <Link
      href={applicationUrl}
      className="group block px-2 rounded-md hover:bg-blue-50"
    >
      <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6 justify-between">
        <div className="flex gap-x-4 pr-6 sm:w-1/2">
          <Image
            width={32}
            height={32}
            className="h-8 w-8 rounded-full bg-gray-50"
            src={studentPhotoSource}
            alt={fullName}
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {fullName}
            </p>
            <p className="flex text-xs leading-5 text-gray-500">
              <a href={`mailto:${email}`} className="relative hover:underline">
                {email}
              </a>
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-900">
            {"Подано "}
            <time dateTime={created}>
              {format(new Date(created), "dd MMM yyyy")}
            </time>
          </p>
          <p className="mt-2 flex items-center text-sm text-gray-500">
            <inferredProps.icon
              className={cn(
                "mr-1.5 h-5 w-5 flex-shrink-0",
                inferredProps.className
              )}
              aria-hidden="true"
            />
            {reviewStatusToLocalizedString(matchReviewStatus(status))}
          </p>
        </div>
      </div>
    </Link>
  );
}
