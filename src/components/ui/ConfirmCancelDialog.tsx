import { Dialog, Transition } from "@headlessui/react";
import cn from "classnames";
import { Fragment, ReactNode } from "react";

const buttonClass =
    "inline-flex w-full justify-center rounded-md border px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto transition-all ease-in-out duration-200 disabled:cursor-not-allowed disabled:opacity-50";

export function ConfirmCancelDialog(props: {
    title: string;
    children?: ReactNode;
    cancelText: string;
    confirmText: string;
    confirmationDisabled?: boolean;
    confirmClasses?: string;
    show: boolean;
    onClose: () => void;
    onCancel?: () => void;
    onConfirm: () => void;
}) {
    return (
        <Transition appear show={props.show} as={Fragment}>
            <Dialog as="div" className="relative z-10 " onClose={props.onClose}>
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
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                <div className="p-6">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        {props.title}
                                    </Dialog.Title>
                                    {props.children}
                                </div>

                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className={cn(
                                            props.confirmClasses ||
                                                "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
                                            buttonClass
                                        )}
                                        onClick={props.onConfirm}
                                        disabled={props.confirmationDisabled}
                                    >
                                        {props.confirmText}
                                    </button>
                                    <button
                                        type="button"
                                        className={cn(
                                            "mt-3 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 sm:mt-0",
                                            buttonClass
                                        )}
                                        onClick={
                                            props.onCancel || props.onClose
                                        }
                                    >
                                        {props.cancelText}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
