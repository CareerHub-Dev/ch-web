import { useJobOffersFeedStore } from "../store/job-offers-feed-store";
import JobOfferMobileFilters from "./JobOfferMobileFilters";
import JobOfferSortMenu from "./JobOfferSortMenu";
import JobOfferSearchBox from "./JobOfferSearchBox";
import FunnelIcon from "@heroicons/react/24/solid/FunnelIcon";
import JobOfferDesktopFilters from "./JobofferDesktopFilters";

export default function JobOffersFeedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const openMobileFilters = useJobOffersFeedStore((s) => s.openMobileFilters);
    return (
        <div className="bg-white rounded-md shadow-md">
            <div>
                <JobOfferMobileFilters />
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-8">
                        <JobOfferSearchBox />
                        <div className="flex items-center">
                            <JobOfferSortMenu />
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={openMobileFilters}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>

                    <section
                        aria-labelledby="job-offers-heading"
                        className="pb-24 pt-6"
                    >
                        <h2 id="job-offers-heading" className="sr-only">
                            job offers
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            <JobOfferDesktopFilters />
                            <div className="lg:col-span-3">{children}</div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
