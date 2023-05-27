import { Fragment } from "react";
import { PaginatedResponse } from "@/lib/api/pagination";
import { JobOfferFeed } from "@/lib/api/job-offer/schemas";
import { InfiniteData } from "@tanstack/react-query";
import JobOfferCard from "./JobOfferCard";

export default function JobOffersList({
    data,
}: {
    data: InfiniteData<PaginatedResponse<JobOfferFeed>>;
}) {
    const noItems =
        data.pages.length === 0 ||
        data.pages[0] === undefined ||
        data.pages[0].data.length === 0;

    if (noItems) {
        return (
            <p className="text-center text-gray-500">{"Нічого не знайдено"}</p>
        );
    }
    return (
        <div className="space-y-6 divide-y">
            {data.pages.map((page, pageIdx) => (
                <Fragment key={pageIdx}>
                    {page.data.map((jobOffer) => (
                        <JobOfferCard key={jobOffer.id} {...jobOffer} />
                    ))}
                </Fragment>
            ))}
        </div>
    );
}
