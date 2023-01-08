import { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { useCvUiStore } from '@/context/cv-ui-store';
import { useCvDataStore } from '@/context/cv-data-store';
import { useCvQueryData } from '@/hooks/useCvQuery';
import cn from 'classnames';

const buttonClass =
  'inline-flex w-full justify-center rounded-md border px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto transition-all ease-in-out duration-200';

export default function DiscardModal() {
  const cvId = useCvDataStore((s) => s.cvId);
  const closeModal = useCvUiStore((s) => s.closeModal);
  const discard = useCvDataStore((s) => s.discardChanges);
  const isOpen = useCvUiStore((s) => s.currentModal) === 'discard';

  const cvData = useCvQueryData(cvId);

  const handleDiscard = () => {
    discard(cvData);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="p-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Скасувати усі зміни?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Усі поточні зміни буде відкинуто до останнього збереження
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={cn(
                      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
                      buttonClass
                    )}
                    onClick={handleDiscard}
                  >
                    Так, скасувати
                  </button>
                  <button
                    type="button"
                    className={cn(
                      'mt-3 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 sm:mt-0',
                      buttonClass
                    )}
                    onClick={closeModal}
                  >
                    Не зараз
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
