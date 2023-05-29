import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment, ReactNode } from "react";
import dynamic from "next/dynamic";
import cn from "classnames";

const ModalPortal = dynamic(() => import("@/components/ui/ModalPortal"), {
  ssr: false,
});

const panelSizes = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  "2xl": "sm:max-w-2xl",
  "3xl": "sm:max-w-3xl",
  full: "sm:max-w-full",
};

export default function DialogWithBackdrop({
  title,
  show,
  onClose,
  children,
  panelSize = "3xl",
}: {
  title?: string;
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  panelSize?: keyof typeof panelSizes;
}) {
  return (
    <ModalPortal>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10 " onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={cn(
                    panelSizes[panelSize],
                    "relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:p-6"
                  )}
                >
                  <div>
                    {title === undefined ? null : (
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                    )}
                    <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        onClick={onClose}
                      >
                        <span className="sr-only">{"Закрити"}</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="mt-4">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </ModalPortal>
  );
}
