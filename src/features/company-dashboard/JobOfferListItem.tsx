import { CompanyJobOffer } from "@/lib/api/company/schemas";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import isPast from "date-fns/isPast";
import format from "date-fns/format";
import cn from "classnames";
import { Fragment } from "react";

const inferredProps = {
    open: {
        badgeClassName: "text-green-700 bg-green-50 ring-green-600/20",
        badgeTitle: "Відкрито",
    },
    archived: {
        badgeClassName: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
        badgeTitle: "Архивовано",
    },
};

export default function JobOfferListItem({
    id,
    title,
    startDate,
    endDate,
}: CompanyJobOffer) {
    const viewItemUrl = `/job-offers/${id}?action=view`;
    const editItemUrl = `/job-offers/${id}?action=edit`;
    const startDateConverted = new Date(startDate);
    const endDateConverted = new Date(endDate);
    const formattedStartDate = format(startDateConverted, "dd/MM/yyyy");
    const formattedEndDate = format(endDateConverted, "dd/MM/yyyy");
    const itemStatus = isPast(endDateConverted) ? "archived" : "open";
    const { badgeTitle, badgeClassName } = inferredProps[itemStatus];

    return (
        <li className="flex items-center justify-between gap-x-6 py-5">
            <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {title}
                    </p>
                    <p
                        className={cn(
                            badgeClassName,
                            "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                        )}
                    >
                        {badgeTitle}
                    </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="whitespace-nowrap">
                        <time dateTime={startDate}>{formattedStartDate}</time>
                        {" до "}
                        <time dateTime={endDate}>{formattedEndDate}</time>
                    </p>
                </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
                <Link
                    href={viewItemUrl}
                    className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                    {"Деталі"}
                    <span className="sr-only">, {title}</span>
                </Link>
                <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                        <span className="sr-only">{"Показати опції"}</span>
                        <EllipsisVerticalIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href={editItemUrl}
                                        className={cn(
                                            active ? "bg-gray-50" : "",
                                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                                        )}
                                    >
                                        {"Редагувати"}
                                        <span className="sr-only">
                                            , {title}
                                        </span>
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        role="button"
                                        className={cn(
                                            active ? "bg-gray-50" : "",
                                            "block px-3 py-1 text-sm leading-6 text-gray-900"
                                        )}
                                    >
                                        {"Видалити"}
                                        <span className="sr-only">
                                            , {title}
                                        </span>
                                    </a>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </li>
    );
}
