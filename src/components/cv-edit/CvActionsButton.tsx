import { useCvAssistanceStore } from '@/context/cv-assistance-store';
import { useCvUiStore } from '@/context/cv-ui-store';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';
import { Fragment } from 'react';

export const CvActionsButton = () => {
  const isAssistanceEnabled = useCvAssistanceStore(
    (s) => s.isAssistanceEnabled
  );
  const toggleAssistance = useCvAssistanceStore((s) => s.toggleAssistance);
  const openSaveModal = useCvUiStore((s) => s.openSaveModal);
  const openDiscardModal = useCvUiStore((s) => s.openDiscardModal);

  return (
    <div className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        onClick={openSaveModal}
        className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {'Зберегти'}
      </button>
      <Menu as="div" className="relative -ml-px block">
        <Menu.Button className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <span className="sr-only">{'Показати додаткові опції'}</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
          <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={toggleAssistance}
                    className={cn(
                      'flex items-center px-4 py-2 text-sm text-left w-full cursor-pointer',
                      active ? 'bg-blue-100 text-blue-900' : 'text-gray-700'
                    )}
                  >
                    Показувати підказки
                    <input
                      id="enableAssist"
                      checked={isAssistanceEnabled}
                      type="checkbox"
                      name="select-all"
                      className="h-4 w-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 ml-2"
                    />
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={openDiscardModal}
                    className={cn(
                      active ? 'bg-red-100 text-red-900' : 'text-gray-700',
                      'block px-4 py-2 text-sm text-left w-full'
                    )}
                  >
                    {'Скасувати зміни'}
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
