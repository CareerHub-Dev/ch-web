import { Menu, Transition } from "@headlessui/react";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import { Fragment } from "react";
import { SortExpression } from "../sort-expressions";
import { useJobOffersFeedStore } from "../store/job-offers-feed-store";
import cn from "classnames";

const sortOptions = [
    { name: "Спочатку нові", id: SortExpression.StartDateAsc },
    { name: "Спочатку старі", id: SortExpression.StartDateDesc },
];

export default function JobOfferSortMenu() {
    const sortExpression = useJobOffersFeedStore((s) => s.sortExpression);
    const changeSortExpression = useJobOffersFeedStore(
        (s) => s.changeSortExpression
    );
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    {"Сортувати"}
                    <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                                {({ active }) => (
                                    <a
                                        role="button"
                                        onClick={() =>
                                            changeSortExpression(option.id)
                                        }
                                        className={cn(
                                            option.id === sortExpression
                                                ? "font-medium text-gray-900"
                                                : "text-gray-500",
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm cursor-pointer"
                                        )}
                                    >
                                        {option.name}
                                    </a>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
