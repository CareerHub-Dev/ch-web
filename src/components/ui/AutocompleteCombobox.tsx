import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { Fragment } from "react";
import cn from "classnames";

type Item = {
  id: string;
  name: string;
};

export default function AutocompleteCombobox(props: {
  disabled?: boolean;
  onBlur?: () => void;
  errors?: string[];
  placeholder?: string;
  selectedItem: Item | null;
  setSelectedItem: (item: Item) => void;
  setQuery: (query: string) => void;
  items: Array<Item>;
  label: string;
}) {
  const hasErrors = props.errors && props.errors.length > 0;
  return (
    <Combobox
      as={Fragment}
      value={props.selectedItem}
      onChange={props.setSelectedItem}
      disabled={props.disabled}
    >
      <Combobox.Label className="block text-sm font-medium text-gray-700 mb-1">
        {props.label}
      </Combobox.Label>
      <div>
        <div className="relative">
          <Combobox.Input
            autoComplete="off"
            className={cn(
              "w-full rounded-md border bg-white py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-1 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500",
              hasErrors
                ? "focus:border-red-500 focus:ring-red-500 border-red-300"
                : "focus:border-blue-500 focus:ring-blue-500 border-gray-300"
            )}
            onChange={(event) => props.setQuery(event.target.value)}
            onBlur={props.onBlur}
            displayValue={(item: { id: string; name: string }) => item?.name}
            placeholder={!props.disabled ? props.placeholder : ""}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {props.items.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.items.map((item) => (
                <Combobox.Option
                  key={item.id}
                  value={item}
                  className={({ active }) =>
                    cn(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-blue-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={cn(
                          "block truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {item.name}
                      </span>

                      {selected && (
                        <span
                          className={cn(
                            "absolute inset-y-0 right-0 flex items-center pr-4",
                            active ? "text-white" : "text-blue-600"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
        {hasErrors ? (
          <p className="mt-2 text-sm text-red-600">{props.errors?.at(0)}</p>
        ) : null}
      </div>
    </Combobox>
  );
}
