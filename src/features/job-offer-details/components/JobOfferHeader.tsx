import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import Image from "next/image";
import { Fragment } from "react";

export default function JobOfferHeader() {
    return (
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
                        {"Продовжити термін"}
                    </a>
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
                                                active ? "bg-gray-50" : "",
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
                                                active ? "bg-gray-50" : "",
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
    );
}
