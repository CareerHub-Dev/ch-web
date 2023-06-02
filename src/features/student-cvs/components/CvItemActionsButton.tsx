import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useStudentCvsStore } from "../store/student-cvs-store";
import { useCvDocxMutation } from "../hooks/use-cv-docx-mutation";
import Link from "next/link";
import cn from "classnames";

export function CvItemActionsButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const { isLoading, mutate } = useCvDocxMutation(title);
  const openRemoveCvModal = useStudentCvsStore((s) => s.openRemoveCvModal);
  const handleRemoveClick = () => {
    openRemoveCvModal({ id, title });
  };
  const handleDownloadClick = () => {
    mutate(id);
  };

  return (
    <>
      <Menu as={"div"} className="relative inline-block text-left">
        <Menu.Button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <EllipsisVerticalIcon title="Дії" className="h-5 w-5" />
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
          <Menu.Items className="absolute z-30 right-0 w-48 origin-top-right rounded-md bg-blue-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/my-cvs/${id}/edit`}
                  passHref
                  className={cn(
                    active && "bg-blue-500 text-white",
                    "group flex w-full items-center rounded-md px-2 py-2 text-sm"
                  )}
                >
                  Редагувати
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleDownloadClick}
                  disabled={isLoading}
                  className={cn(
                    active && "bg-blue-500 text-white",
                    "group flex w-full items-center rounded-md px-2 py-2 text-sm disabled:opacity-50 disabled:cursor-wait"
                  )}
                >
                  Завантажити .docx
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleRemoveClick}
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
    </>
  );
}
