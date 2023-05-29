import Badge from "@/components/ui/Badge";
import {
  BriefcaseIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import format from "date-fns/format";

export default function JobOfferAsideInfo({
  tags,
  jobPosition,
  workFormat,
  experienceLevel,
  jobType,
  endDate,
}: {
  tags: Tag[];
  jobPosition: string;
  workFormat: string;
  experienceLevel: string;
  jobType: string;
  endDate: string;
}) {
  return (
    <>
      <h2 className="sr-only">{"Позиція і теги"}</h2>
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
        <dl className="flex flex-col">
          <div className="pl-6 pt-6">
            <dt className="text-sm font-semibold leading-6 text-gray-900">
              {"Позиція"}
            </dt>
            <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
              {jobPosition}
            </dd>
          </div>
          <div className="mt-6 flex flex-col px-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {jobType}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {workFormat}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <ChartBarSquareIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {experienceLevel}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {`Закінчується: ${format(new Date(endDate), "dd.MM.yyyy")}`}
            </div>
          </div>
          <div className="my-6 flex flex-wrap gap-x-4 gap-y-4 border-t border-gray-900/5 px-6 pt-6">
            {tags.map((tag, tagIdx) => (
              <Badge key={tagIdx} text={tag.name} color="blue" />
            ))}
          </div>
        </dl>
      </div>
    </>
  );
}
