import ItemSelection from "@/components/ui/ItemsSelection";
import AutocompleteCombobox from "@/components/ui/AutocompleteCombobox";
import { SELECTION_ITEMS, JOB_DIRECTIONS } from "../../mocks/job-directions";
import { useState } from "react";

export default function JobPositionSelection() {
  const items = SELECTION_ITEMS satisfies { id: string; name: string }[];
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [jobPositionInput, setJobPositionInput] = useState("");
  const [selectedJobPosition, setSelectedJobPosition] =
    useState(DEFAULT_JOB_POSITION);

  const handleItemSelected = (val: { id: string; name: string }) => {
    setSelectedItem(val);
    setSelectedJobPosition(DEFAULT_JOB_POSITION);
    setJobPositionInput("");
  };

  const handleJobPositionInputChange = (val: string) => {
    if (selectedItem === null) {
      return;
    }

    setJobPositionInput(val);
  };
  const normalizedJobPositionInput = jobPositionInput.trim().toLowerCase();

  const shownSuggestions =
    selectedItem === null
      ? []
      : JOB_DIRECTIONS.find(
          (item) => item.id === selectedItem?.id
        )!.positionSuggestions.filter((item) => {
          return item.name
            .trim()
            .toLowerCase()
            .includes(normalizedJobPositionInput);
        });

  return (
    <>
      <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <ItemSelection
          items={items}
          selectedItem={selectedItem ?? { id: "-1", name: "Оберіть напрямок" }}
          setSelected={handleItemSelected}
          onBlur={() => {}}
          label="Напрямок роботи"
          hasError={false}
        />
      </div>

      <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <AutocompleteCombobox
          label="Посада"
          placeholder="Почніть вводити посаду"
          disabled={selectedItem === null}
          items={shownSuggestions}
          selectedItem={selectedJobPosition}
          setSelectedItem={setSelectedJobPosition}
          setQuery={handleJobPositionInputChange}
        />
      </div>
    </>
  );
}

const DEFAULT_JOB_POSITION = { id: "-1", name: "" };
