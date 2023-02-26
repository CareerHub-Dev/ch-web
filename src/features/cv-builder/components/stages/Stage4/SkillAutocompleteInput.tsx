import { Combobox } from "@headlessui/react";
import { useSkillsQuery } from "../../mocks/skills";
import { useRef } from "react";
import { useDebounce, useBoolean, useOnClickOutside } from "usehooks-ts";
import cn from "classnames";

export default function SkillAutocompleteInput(props: {
  id: string;
  type: "hard" | "soft";
  value: string;
  onChange: (val: string) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debouncedSearchTerm = useDebounce(props.value, 200);
  const showSuggestions = useBoolean(false);
  const { data: suggestionsData } = useSkillsQuery(
    debouncedSearchTerm,
    props.type
  );
  const suggestions = suggestionsData ?? [];

  const handleOutsideClick = () => {
    showSuggestions.setFalse();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
    showSuggestions.setTrue();
  };

  const handleComboboxItemSelected = (event: string) => {
    props.onChange(event);
    showSuggestions.setFalse();
  };

  useOnClickOutside(wrapperRef, handleOutsideClick);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <Combobox onChange={handleComboboxItemSelected}>
        <Combobox.Input
          className="relative w-full border border-gray-300 text-sm rounded-l-md px-4 py-2 font-medium text-gray-700 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={handleInputChange}
          onFocus={showSuggestions.setTrue}
          value={props.value}
          displayValue={() => props.value}
          autoComplete="off"
        />

        {props.value.length > 0 &&
        showSuggestions.value &&
        suggestions.length > 0 ? (
          <Combobox.Options className="mt-2 bg-indigo-50 p-2 absolute z-30 w-full rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-auto">
            {suggestions.map((suggestion, suggestionIndex) => (
              <Combobox.Option
                key={suggestionIndex}
                value={suggestion}
                className={({ active }) =>
                  cn(
                    "cursor-default select-none rounded-md px-2 py-2",
                    active && "bg-indigo-600 text-white"
                  )
                }
              >
                {suggestion}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        ) : null}
      </Combobox>
    </div>
  );
}
