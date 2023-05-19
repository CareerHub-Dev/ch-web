import CommonLayout from "@/components/layout/CommonLayout";
import Link from "next/link";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import {
    getCompanySelf,
    getCompanySelfJobOffersAmount,
    getCompanySelfSubscribersAmount,
    getCompanySelfJobOffers,
} from "@/lib/api/company";
import { protectedSsr } from "@/lib/protected-ssr";
import parseUnknownError from "@/lib/parse-unknown-error";
import CompanyStat from "@/features/company-dashboard/CompanyStat";
import { Fragment } from "react";
import cn from "classnames";
import {
    ArrowDownCircleIcon,
    ArrowPathIcon,
    ArrowUpCircleIcon,
    PlusSmallIcon,
} from "@heroicons/react/24/solid";

const statuses = {
    Paid: "text-green-700 bg-green-50 ring-green-600/20",
    Withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
    Overdue: "text-red-700 bg-red-50 ring-red-600/10",
};

const days = [
    {
        date: "Today",
        dateTime: "2023-03-22",
        transactions: [
            {
                id: 1,
                invoiceNumber: "00012",
                href: "#",
                amount: "$7,600.00 USD",
                tax: "$500.00",
                status: "Paid",
                client: "Reform",
                description: "Website redesign",
                icon: ArrowUpCircleIcon,
            },
            {
                id: 2,
                invoiceNumber: "00011",
                href: "#",
                amount: "$10,000.00 USD",
                status: "Withdraw",
                client: "Tom Cook",
                description: "Salary",
                icon: ArrowDownCircleIcon,
            },
            {
                id: 3,
                invoiceNumber: "00009",
                href: "#",
                amount: "$2,000.00 USD",
                tax: "$130.00",
                status: "Overdue",
                client: "Tuple",
                description: "Logo design",
                icon: ArrowPathIcon,
            },
        ],
    },
    {
        date: "Yesterday",
        dateTime: "2023-03-21",
        transactions: [
            {
                id: 4,
                invoiceNumber: "00010",
                href: "#",
                amount: "$14,000.00 USD",
                tax: "$900.00",
                status: "Paid",
                client: "SavvyCal",
                description: "Website redesign",
                icon: ArrowUpCircleIcon,
            },
        ],
    },
];
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
    const jobOffers = useProtectedPaginatedQuery({
        queryKey: ["company-self-job-offers"],
        getItems: getCompanySelfJobOffers,
        params: {
            pageSize: 36,
            active: true,
        }
    });

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
                        className="ml-auto flex items-center gap-x-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
                    >
                        <PlusSmallIcon
                            className="-ml-1.5 h-5 w-5"
                            aria-hidden="true"
                        />
                        {"Додати оголошення"}
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
                    <div className="mt-6 overflow-hidden border-t border-gray-100">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                                <table className="w-full text-left">
                                    <thead className="sr-only">
                                        <tr>
                                            <th>{"Резюме, підписки"}</th>
                                            <th className="hidden sm:table-cell">
                                                {"Назва"}
                                            </th>
                                            <th>{"Деталі"}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {days.map((day) => (
                                            <Fragment key={day.dateTime}>
                                                {day.transactions.map(
                                                    (transaction) => (
                                                        <tr
                                                            key={transaction.id}
                                                        >
                                                            <td className="relative py-5 pr-6">
                                                                <div className="flex gap-x-6">
                                                                    <transaction.icon
                                                                        className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                                                                        aria-hidden="true"
                                                                    />
                                                                    <div className="flex-auto">
                                                                        <div className="flex items-start gap-x-3">
                                                                            <div className="text-sm font-medium leading-6 text-gray-900">
                                                                                {
                                                                                    transaction.amount
                                                                                }
                                                                            </div>
                                                                            <div
                                                                                className={cn(
                                                                                    statuses[
                                                                                        transaction.status as keyof typeof statuses
                                                                                    ],
                                                                                    "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                                                                                )}
                                                                            >
                                                                                {
                                                                                    transaction.status
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        {transaction.tax ? (
                                                                            <div className="mt-1 text-xs leading-5 text-gray-500">
                                                                                {
                                                                                    transaction.tax
                                                                                }{" "}
                                                                                tax
                                                                            </div>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                                <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                                                <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                                            </td>
                                                            <td className="hidden py-5 pr-6 sm:table-cell">
                                                                <div className="text-sm leading-6 text-gray-900">
                                                                    {
                                                                        transaction.client
                                                                    }
                                                                </div>
                                                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                                                    {
                                                                        transaction.description
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="py-5 text-right">
                                                                <div className="flex justify-end">
                                                                    <a
                                                                        href={
                                                                            transaction.href
                                                                        }
                                                                        className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                                                                    >
                                                                        View
                                                                        <span className="hidden sm:inline">
                                                                            {" "}
                                                                            transaction
                                                                        </span>
                                                                        <span className="sr-only">
                                                                            ,
                                                                            invoice
                                                                            #
                                                                            {
                                                                                transaction.invoiceNumber
                                                                            }
                                                                            ,{" "}
                                                                            {
                                                                                transaction.client
                                                                            }
                                                                        </span>
                                                                    </a>
                                                                </div>
                                                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                                                    Invoice{" "}
                                                                    <span className="text-gray-900">
                                                                        #
                                                                        {
                                                                            transaction.invoiceNumber
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </Fragment>
                                        ))}
                                    </tbody>
                                </table>
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
