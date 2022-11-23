import { Bars3Icon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';

export default function PopOverMenu() {
  return (
    <Popover className="relative">
      {({}) => (
        <>
          <Popover.Button className="p-2 rounded-md hover:bg-lightGray focus:outline-none focus:ring-2 focus:ring-inset focus:ring-darkBlueAccent">
            <Bars3Icon className="w-6 h-6" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2"></div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
