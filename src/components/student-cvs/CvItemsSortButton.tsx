import { Listbox, Transition } from '@headlessui/react';
import { BarsArrowUpIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import cn from 'classnames';

export const CvItemsSortButton = () => {
  const [selected, setSelected] = [
    {
      title: 'kuk',
    },
    () => {},
  ];

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative flex rounded-md shadow-sm">
            <Listbox.Button
              type="button"
              className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <BarsArrowUpIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <span className="sm:text-sm">Сортувати</span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-12 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {DUMMY_OPTIONS.map((option) => (
                  <Listbox.Option
                    key={option.title}
                    className={({ active }) =>
                      cn(
                        active ? 'text-white bg-blue-500' : 'text-gray-900',
                        'cursor-default select-none p-4 text-sm'
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <p
                            className={
                              selected ? 'font-semibold' : 'font-normal'
                            }
                          >
                            {option.title}
                          </p>
                          {selected ? (
                            <span
                              className={
                                active ? 'text-white' : 'text-blue-500'
                              }
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

const DUMMY_OPTIONS = [{ title: 'DUMMY1_TITLE' }, { title: 'DUMMY2_TITLE' }];
