import { Fragment, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import cn from "classnames";

type Item = {
  id: string;
  name: string;
};

export default function ItemSelection({
  label,
  items,
  selectedItem,
  setSelected,
  errors,
  onBlur,
}: {
  label?: string;
  items: Array<Item>;
  selectedItem: Item;
  setSelected: (item: Item) => void;
  errors?: string[];
  onBlur?: () => void;
}) {
  const listboxRef = useRef(null);
  const [wasFocused, setWasFocused] = useState(false);
  useOnClickOutside(listboxRef, () => {
    if (wasFocused && !!onBlur) {
      onBlur();
    }
  });
  const hasErrors = errors && errors.length > 0;
  return (
    <Listbox value={selectedItem} onChange={setSelected}>
      {({ open }) => (
        <>
          {label && (
            <Listbox.Label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </Listbox.Label>
          )}
          <div className="relative" ref={listboxRef}>
            <Listbox.Button
              className={cn(
                "relative w-full cursor-pointer rounded-md border bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 sm:text-sm",
                hasErrors
                  ? "focus:border-red-500 focus:ring-red-500 border-red-300"
                  : "focus:border-blue-500 focus:ring-blue-500 border-gray-300"
              )}
              onClickCapture={() => setWasFocused(true)}
            >
              <span
                className={cn(
                  "block truncate",
                  hasErrors ? "text-red-900" : ""
                )}
              >
                {selectedItem.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className={cn(
                    "h-5 w-5",
                    hasErrors ? "text-red-400" : "text-gray-400"
                  )}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {items.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      cn(
                        active ? "text-white bg-blue-600" : "text-gray-900",
                        "relative cursor-pointer select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={cn(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {item.name}
                        </span>

                        {selected ? (
                          <span
                            className={cn(
                              active ? "text-white" : "text-blue-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>

            {hasErrors ? (
              <p className="mt-2 text-sm text-red-600">{errors.at(0)}</p>
            ) : null}
          </div>
        </>
      )}
    </Listbox>
  );
}
