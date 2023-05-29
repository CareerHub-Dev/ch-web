import { getImageWithDefault } from "@/lib/api/image";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import format from "date-fns/format";
import Image from "next/image";
import Link from "next/link";

export default function JobOfferApplicationItem({
  status,
  id,
  created,
}: {
  status: string;
  created: string;
  id: string;
}) {
  const applicationUrl = `/applications/${id}`;
  const applicantAvatar = getImageWithDefault(null, "Student");
  const applicantFullName = "Firstname Lastname";
  const applicantEmail = "firstname.lastname@nure.ua";

  return (
    <Link href={applicationUrl} className="group block">
      <div className="flex items-center px-4 py-5 sm:px-0 sm:py-6">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="flex-shrink-0">
            <Image
              className="h-12 w-12 rounded-full group-hover:opacity-75"
              src={applicantAvatar}
              width={48}
              height={48}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
            <div>
              <p className="truncate text-sm font-medium text-blue-600">
                {applicantFullName}
              </p>
              <p className="mt-2 flex items-center text-sm text-gray-500">
                <EnvelopeIcon
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <span className="truncate">{applicantEmail}</span>
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
                  {status}
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
