import { Fragment, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { useProtectedQuery } from "@/hooks/useProtectedQuery";
import { AxiosInstance } from "axios";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import LoadingSpinner from "./LoadingSpinner";

export default function QueryAutoCompleteCombobox<TItem>({
  onSubmit,
  queryKey,
  queryFn,
  label,
  disabled = false,
  placeholder = "",
  getItemName,
}: {
  onSubmit: (item: TItem) => void;
  queryKey: string;
  queryFn: (search: string) => (instance: AxiosInstance) => Promise<TItem[]>;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  getItemName: (item: TItem) => string;
}) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const { data, isLoading, isError } = useProtectedQuery(
    [queryKey, debouncedSearch],
    queryFn(debouncedSearch)
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleComboboxItemSelected = (item: TItem) => {
    onSubmit(item);
  };

  return (
    <Combobox
      as={Fragment}
      onChange={handleComboboxItemSelected}
      disabled={disabled}
    >
      <Combobox.Label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </Combobox.Label>
      <div>
        <div className="relative">
          <Combobox.Input
            autoComplete="off"
            className="w-full rounded-md border bg-white py-2 pl-3 pr-10 shadow-sm focus:outline-none focus:ring-1 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 focus:border-blue-500 focus:ring-blue-500 border-gray-300"
            onChange={handleSearchChange}
            displayValue={getItemName}
            placeholder={!disabled ? placeholder : ""}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {isLoading ? (
            <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500">
              <LoadingSpinner className="h-5 w-5" />
            </div>
          ) : isError ? null : (
            data.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((item, itemIdx) => (
                  <Combobox.Option
                    key={itemIdx}
                    value={item}
                    className={({ active }) =>
                      cn(
                        "relative cursor-default select-none py-2 pl-3 pr-9",
                        active ? "bg-blue-600 text-white" : "text-gray-900"
                      )
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={cn(
                            "block truncate",
                            selected && "font-semibold"
                          )}
                        >
                          {getItemName(item)}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )
          )}
        </div>
      </div>
    </Combobox>
  );
}
