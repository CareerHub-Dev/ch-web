import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import cn from "classnames";

export default function StudentExperienceActionsButton({
    onEditClick,
    onRemoveClick,
}: {
    onEditClick: () => void;
    onRemoveClick: () => void;
}) {
    return (
        <Menu as="div" className="relative flex-none">
            <Menu.Button className="-m-2.5 block rounded-full p-2.5 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <span className="sr-only">{"Показати опції"}</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                            <button
                                onClick={onEditClick}
                                className={cn(
                                    active ? "bg-gray-50" : "",
                                    "group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                )}
                            >
                                {"Редагувати"}
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                onClick={onRemoveClick}
                                className={cn(
                                    active ? "bg-gray-50" : "",
                                    "group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                )}
                            >
                                {"Видалити"}
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
