import CommonLayout from "@/components/layout/CommonLayout";
import Link from "next/link";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import {
    getCompanySelf,
    getCompanySelfJobOffersAmount,
    getCompanySelfSubscribersAmount,
} from "@/lib/api/company";
import { protectedSsr } from "@/lib/protected-ssr";
import parseUnknownError from "@/lib/parse-unknown-error";
import CompanyStat from "@/features/company-dashboard/CompanyStat";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import JobOfferList from "@/features/company-dashboard/JobOfferList";

export default function CompanyDashboardPage() {
    const { data, isLoading, isError, error } = useProtectedQuery(
        ["company-self"],
        getCompanySelf
    );
    const subscribersAmount = useProtectedQuery(
        ["company-self-subscribers-amount"],
        getCompanySelfSubscribersAmount
    );
    const jobOffersAmount = useProtectedQuery(
        ["company-self-job-offers-amount"],
        getCompanySelfJobOffersAmount
    );

    const stats = [
        {
            query: subscribersAmount,
            name: "Підписники",
        },
        {
            query: jobOffersAmount,
            name: "Вакансії",
        },
    ];

    return (
        <div className="bg-white rounded-md shadow-md">
            <header className="pb-4 pt-6 sm:pb-6">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
                    <h1 className="text-base font-semibold leading-7 text-gray-900">
                        {"Дошка: "}
                        {isLoading ? (
                            <span className="h-4 bg-gray-300 rounded-md w-64" />
                        ) : isError ? (
                            <span className="text-red-500">
                                {parseUnknownError(error)}
                            </span>
                        ) : (
                            <span className="font-bold">{data.name}</span>
                        )}
                    </h1>
                    <Link
                        href="/job-offers/add"
                        className="ml-auto flex items-center gap-x-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-200"
                    >
                        <PlusSmallIcon
                            className="-ml-1.5 h-5 w-5"
                            aria-hidden="true"
                        />
                        {"Додати вакансію"}
                    </Link>
                </div>
            </header>

            <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
                <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:px-2">
                    {stats.map((stat, statIdx) => (
                        <CompanyStat
                            key={statIdx}
                            index={statIdx}
                            name={stat.name}
                            query={stat.query}
                        />
                    ))}
                </dl>
            </div>

            <div className="space-y-16 py-16 xl:space-y-20">
                <div>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                            {"Останні оголошення"}
                        </h2>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                                <JobOfferList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

CompanyDashboardPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
    allowedRoles: ["Company"],
});
