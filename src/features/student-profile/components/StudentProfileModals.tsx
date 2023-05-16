import { Dialog, Transition } from "@headlessui/react";
import { useStudentProfileStore } from "../store/student-profile-store";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import StudentStatsPaginatedList from "./StudentStatsPaginatedList";

const modalAssets = {
    followedStudents: "Підписки",
    studentFollowers: "Підписники",
    followedCompanies: "Відстежувані компанії",
    trackedJobOffers: "Відстежувані вакансії",
};

export default function StudentProfileModals({
    accountId,
}: {
    accountId: string;
}) {
    const currentModal = useStudentProfileStore((s) => s.currentModal);
    const closeModal = useStudentProfileStore((s) => s.closeModal);
    const modalIsOpen = currentModal !== null;
    return (
        <Transition appear show={modalIsOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10 " onClose={closeModal}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg md:max-w-xl sm:p-6">
                                <div>
                                    {modalIsOpen ? (
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            {modalAssets[currentModal]}
                                        </Dialog.Title>
                                    ) : null}
                                    <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={closeModal}
                                        >
                                            <span className="sr-only">
                                                {"Закрити"}
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>

                                    <div className="mt-4">
                                        {modalIsOpen ? (
                                            <StudentStatsPaginatedList
                                                accountId={accountId}
                                                currentModal={currentModal}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
