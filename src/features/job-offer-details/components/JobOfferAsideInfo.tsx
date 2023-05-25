import Badge from "@/components/ui/Badge";
import {
    BriefcaseIcon,
    CalendarIcon,
    MapPinIcon,
} from "@heroicons/react/24/solid";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";

export default function JobOfferAsideInfo({ tags }: { tags: Tag[] }) {
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
                            {"C++ Developer"}
                        </dd>
                    </div>
                    <div className="mt-6 flex flex-col pl-6">
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <BriefcaseIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                            />
                            Full-time
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <MapPinIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                            />
                            Remote
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <ChartBarSquareIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                            />
                            {"Junior"}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                            <CalendarIcon
                                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                            />
                            {`Закінчується January 9, 2023`}
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
