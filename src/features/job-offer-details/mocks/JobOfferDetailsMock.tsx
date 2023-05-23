import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import classNames from "classnames";
import Badge from "@/components/ui/Badge";

const tags: Tag[] = [
    {
        id: "1",
        name: "Frontend",
    },
    {
        id: "2",
        name: "Backend",
    },
    {
        id: "3",
        name: "Fullstack",
    },
    {
        id: "4",
        name: "DevOps",
    },
    {
        id: "5",
        name: "QA",
    },
    {
        id: "6",
        name: "UX/UI",
    },
    {
        id: "7",
        name: "Mobile",
    },
];

export default function JobOfferDetailsMock() {
    return (
        <>
            <header className="relative isolate">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="mx-auto flex max-w-2xl items-center justify-between gap-x-8 lg:mx-0 lg:max-w-none">
                        <div className="flex items-center gap-x-6">
                            <Image
                                width={64}
                                height={64}
                                src="/company-dummy-logo.png"
                                alt="company"
                                className="h-16 w-16 flex-none rounded-full ring-1 ring-gray-900/10"
                            />
                            <h1 className="font-semibold text-gray-900 text-lg leading-6">
                                Job Offer
                            </h1>
                        </div>
                        <div className="flex items-center gap-x-4 sm:gap-x-6">
                            <a
                                href="#"
                                className="hidden text-sm font-semibold leading-6 text-gray-900 sm:block"
                            >
                                {"Редагувати"}
                            </a>
                            <a
                                href="#"
                                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {"Видалити"}
                            </a>

                            <Menu as="div" className="relative sm:hidden">
                                <Menu.Button className="-m-3 block p-3">
                                    <span className="sr-only">More</span>
                                    <EllipsisVerticalIcon
                                        className="h-5 w-5 text-gray-500"
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
                                    <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    type="button"
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-50"
                                                            : "",
                                                        "block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900"
                                                    )}
                                                >
                                                    Copy URL
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(
                                                        active
                                                            ? "bg-gray-50"
                                                            : "",
                                                        "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                    )}
                                                >
                                                    Edit
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
            </header>

            <div className="mx-auto bg-white rounded-md max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {/* Invoice summary */}
                    <div className="lg:col-start-3 lg:row-end-1">
                        <h2 className="sr-only">{"Позиція і теги"}</h2>
                        <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                            <dl className="flex flex-wrap">
                                <div className="flex-auto pl-6 pt-6">
                                    <dt className="text-sm font-semibold leading-6 text-gray-900">
                                        {"Позиція"}
                                    </dt>
                                    <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                                        {"C++ Developer"}
                                    </dd>
                                </div>
                                <div className="my-6 flex flex-wrap gap-x-4 gap-y-4 border-t border-gray-900/5 px-6 pt-6">
                                    {tags.map((tag, tagIdx) => (
                                        <Badge
                                            key={tagIdx}
                                            text={tag.name}
                                            color="blue"
                                        />
                                    ))}
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Invoice */}
                    <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20">
                        <h2 className="text-base font-semibold leading-6 text-gray-900">
                            {"Активність"}
                        </h2>
                        <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-6">
                            <div className="sm:pr-4 sm:col-span-3">
                                <dt className="inline text-gray-500">
                                    {"Створено"}
                                </dt>{" "}
                                <dd className="inline text-gray-700">
                                    <time dateTime="2023-23-01">
                                        January 23, 2023
                                    </time>
                                </dd>
                            </div>
                            <div className="mt-2 sm:mt-0 sm:pl-4 sm:col-span-3">
                                <dt className="inline text-gray-500">
                                    {"Закінчується"}
                                </dt>{" "}
                                <dd className="inline text-gray-700">
                                    <time dateTime="2023-31-01">
                                        January 31, 2023
                                    </time>
                                </dd>
                            </div>
                            <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4 sm:col-span-2">
                                <dt className="font-semibold text-gray-900">
                                    {"Тип роботи"}
                                </dt>
                                <dd className="mt-2 text-gray-500">
                                    FULL TIME
                                </dd>
                            </div>
                            <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6 sm:col-span-2">
                                <dt className="font-semibold text-gray-900">
                                    {"Формат"}
                                </dt>
                                <dd className="mt-2 text-gray-500">REMOTE</dd>
                            </div>
                            <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6 sm:col-span-2">
                                <dt className="font-semibold text-gray-900">
                                    {"Рівень"}
                                </dt>
                                <dd className="mt-2 text-gray-500">INTERN</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </>
    );
}
