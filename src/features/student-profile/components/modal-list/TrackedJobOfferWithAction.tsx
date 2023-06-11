import { JobOffer } from "@/lib/schemas/JobOffer";
import Image from "next/image";
import { getJobOfferLogo } from "@/lib/api/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function TrackedJobOfferWithAction({
  id,
  title,
  image,
  company,
}: JobOffer) {
  const imageUrl = getJobOfferLogo(image, null);
  const jobOfferUrl = `/job-offers/${id}`;
  const companyName = company.name;
  const companyProfileUrl = `/companies/${company.id}`;

  return (
    <li className="relative flex justify-between py-5">
      <div className="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
        <Image
          width={48}
          height={48}
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
          src={imageUrl}
          alt={title}
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900 hover:underline hover:underline-offset-2">
            <Link href={jobOfferUrl}>
              <span className="absolute inset-x-0 -top-px bottom-0" />
              {title}
            </Link>
          </p>
          <p className="mt-1 flex text-xs leading-5 text-gray-500">
            <Link
              href={companyProfileUrl}
              className="relative truncate hover:underline"
            >
              {companyName}
            </Link>
          </p>
        </div>
      </div>
      <ChevronRightIcon
        className="h-5 w-5 flex-none text-gray-400"
        aria-hidden="true"
      />
    </li>
  );
}
