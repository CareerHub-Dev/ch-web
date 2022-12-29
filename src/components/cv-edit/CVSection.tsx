import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import cn from 'classnames';

export default function CVSection({ title }: { title: string }) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className="flex w-full justify-between items-center rounded-lg bg-blue-100 px-4 py-2 text-left text-xl leading-loose font-medium text-blue-900
          hover:bg-blue-200 
          focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
          >
            <span>{title}</span>
            <ChevronUpIcon
              className={cn(
                open && 'rotate-180 transform',
                'h-8 w-8 text-blue-500'
              )}
            />
          </Disclosure.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              Yes! You can purchase a license that you can share with your
              entire team.
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
