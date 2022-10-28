import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import cn from 'classnames';

const OrderByOptions = ({
  options,
  selectedOption,
  setSelectedOption,
}: {
  options: Array<{
    label: string;
    value: string;
  }>;
  selectedOption: { label: string; value: string };
  setSelectedOption: (option: { label: string; value: string }) => void;
}) => {
  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      <div className="relative">
        <Listbox.Button
          className="relative w-full cursor-default bg-lightBlueAccent border border-solid 
          border-lightBlueAccent rounded-lg text-white pl-4 pr-10 py-2 text-sm focus:outline-none"
        >
          <span className="block truncate cursor-pointer">Порядок</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-white"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute right-0 mt-2 w-56 origin-top-right divide-y text-sm
            divide-primaryGray rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {options.map((item, itemIndex) => (
              <Listbox.Option
                key={itemIndex}
                className={({ active }) =>
                  cn(
                    'relative cursor-pointer select-none py-2 pl-10 pr-4 overflow-hidden',
                    active ? 'bg-lightBlue' : 'text-gray-900'
                  )
                }
                value={item}
              >
                {(_) => (
                  <>
                    <span
                      className={cn(
                        'block truncate',
                        item.value === selectedOption.value &&
                          'text-lightBlueAccent font-semibold'
                      )}
                    >
                      {item.label}
                    </span>
                    {item.value === selectedOption.value ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lightBlueAccent">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
export default OrderByOptions;
