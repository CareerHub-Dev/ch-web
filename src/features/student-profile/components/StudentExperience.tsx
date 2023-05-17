import { Experience } from "@/lib/api/student/schemas";
import format from "date-fns/format";

export default function StudentExperience({
    title,
    companyName,
    startDate,
    endDate,
}: Experience) {
    const formattedStartDate = format(new Date(startDate), "LLLL yyyy");
    const formattedEndDate =
        endDate === null ? "досі" : format(new Date(endDate), "LLLL yyyy");

    return (
        <li className="flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                    {title}
                </p>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="truncate">{companyName}</p>
                    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                        <circle cx={1} cy={1} r={1} />
                    </svg>
                    <p className="whitespace-nowrap">
                        {"Від "}
                        <time dateTime={startDate}>{formattedStartDate}</time>
                        {endDate === null ? (
                            ` ${formattedEndDate}`
                        ) : (
                            <>
                                {" до "}
                                <time dateTime={endDate}>
                                    {formattedEndDate}
                                </time>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </li>
    );
}
