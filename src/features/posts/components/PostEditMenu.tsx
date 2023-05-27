import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import { Fragment } from "react";

export default function PostEditMenu({
    onRemoveClick,
}: {
    onRemoveClick: () => void;
}) {
    return (
        <Menu as={"div"} className="relative inline-block text-left">
            <Menu.Button
                type="button"
                className="p-2 bg-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 "
            >
                <EllipsisVerticalIcon title="Дії" className="h-6 w-6" />
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
                <Menu.Items className="absolute z-10 right-0 w-48 origin-top-right rounded-md bg-blue-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                type="button"
                                onClick={onRemoveClick}
                                className={cn(
                                    active && "bg-red-500 text-white",
                                    "group flex w-full items-center rounded-md px-2 py-2 text-sm"
                                )}
                            >
                                Видалити
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
