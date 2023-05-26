import { getImageWithDefault } from "@/lib/api/image";
import { BriefPost } from "../hooks/use-self-posts-query";
import Image from "next/image";
import { matchUserRole } from "@/lib/enums";
import {
    EllipsisVerticalIcon,
    HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react";
import format from "date-fns/format";

export default function SelfPostItem({
    id,
    text,
    likes,
    createdDate,
    account,
}: BriefPost) {
    const authorAvatarUrl = getImageWithDefault(
        account.image,
        matchUserRole(account.role)
    );

    return (
        <li className="bg-white px-4 py-6 shadow rounded-lg sm:p-6">
            <article aria-labelledby={"post-" + id}>
                <div>
                    <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                            <Image
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full"
                                src={authorAvatarUrl}
                                alt="author"
                            />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                {account.name}
                            </p>

                            <p className="text-sm text-gray-500">
                                <time dateTime={createdDate}>
                                    {format(
                                        new Date(createdDate),
                                        "LLLL d, yyyy"
                                    )}
                                </time>
                            </p>
                        </div>
                        <div className="flex flex-shrink-0 self-center">
                            <Menu
                                as="div"
                                className="relative inline-block text-left"
                            >
                                <div>
                                    <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                                        <span className="sr-only">
                                            Open options
                                        </span>
                                        <EllipsisVerticalIcon
                                            className="h-5 w-5"
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
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100 text-gray-900"
                                                                : "text-gray-700",
                                                            "flex px-4 py-2 text-sm"
                                                        )}
                                                    >
                                                        <span>Delete</span>
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>
                <p className="mt-2 space-y-4 text-sm text-gray-700">{text}</p>

                <div className="mt-6 flex justify-between space-x-8">
                    <div className="flex space-x-6">
                        <span className="inline-flex items-center text-sm">
                            <button
                                type="button"
                                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                            >
                                <HandThumbUpIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                                <span className="font-medium text-gray-900">
                                    {likes}
                                </span>
                                <span className="sr-only">likes</span>
                            </button>
                        </span>
                    </div>
                </div>
            </article>
        </li>
    );
}
