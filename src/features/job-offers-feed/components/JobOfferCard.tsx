import Image from "next/image";
import Link from "next/link";
import format from "date-fns/format";
import { JobOfferInFeed } from "@/lib/api/job-offer/schemas";
import { useJobOffersFeedStore } from "../store/job-offers-feed-store";
import { getImage } from "@/lib/api/image";

export default function JobOfferCard({
  id,
  title,
  image,
  startDate,
  endDate,
  jobType,
  workFormat,
  experienceLevel,
  company,
  tags,
}: JobOfferInFeed) {
  const addTag = useJobOffersFeedStore((s) => s.addTag);
  const detailsUrl = `/job-offers/${id}`;
  const companyUrl = `/companies/${company.id}`;
  const imageSrc =
    image === undefined || image === null ? "/company-dummy-logo.png" : getImage(image);

  return (
    <div
      aria-roledescription="job offer"
      key={id}
      className="relative isolate flex gap-8"
    >
      <div className="relative aspect-square w-32 h-32 shrink-0 sm:w-32 sm:h-32 lg:w-52 lg:h-52">
        <Image
          src={imageSrc}
          alt="jobOffer"
          width={300}
          height={624}
          className="absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover"
        />
      </div>
      <div>
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <Link href={detailsUrl}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>
        <div className="group relative max-w-xl">
          <div className="flex items-center gap-x-2 text-xs">
            <time dateTime={startDate} className="text-gray-500">
              {format(new Date(startDate), "MMM dd, yyyy")}
            </time>
            {" - "}
            <time dateTime={endDate} className="text-gray-500">
              {format(new Date(endDate), "MMM dd, yyyy")}
            </time>
          </div>

          <div className="mt-4 flex items-center gap-x-4 text-xs">
            {tags.map((tag) => (
              <a
                role="button"
                onClick={() => addTag(tag)}
                key={tag.id}
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              >
                {tag.name}
              </a>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-x-4 text-xs">
            <a
              href={"#"}
              className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-600 hover:bg-blue-100"
            >
              {experienceLevel}
            </a>
            <a
              href={"#"}
              className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-600 hover:bg-blue-100"
            >
              {jobType}
            </a>
            <a
              href={"#"}
              className="relative z-10 rounded-full bg-green-50 px-3 py-1.5 font-medium text-green-600 hover:bg-green-100"
            >
              {workFormat}
            </a>
          </div>
        </div>
        <div className="mt-3 flex border-t border-gray-900/5 py-3">
          <div className="relative flex items-center gap-x-4">
            <p className="font-semibold text-gray-900 text-sm leading-6">
              <Link href={companyUrl}>
                <span className="absolute inset-0" />
                {company.name}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
