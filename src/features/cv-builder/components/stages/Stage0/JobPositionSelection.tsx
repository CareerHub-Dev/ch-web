import ItemSelection from "@/components/ui/ItemsSelection";
import AutocompleteCombobox from "@/components/ui/AutocompleteCombobox";
import { SELECTION_ITEMS, JOB_DIRECTIONS } from "../../mocks/job-directions";
import { useState } from "react";
import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";

export default function JobPositionSelection() {
  const items = SELECTION_ITEMS satisfies { id: string; name: string }[];

  const selectedDirection = useCvDataStore((s) => s.cvData.workDirection);
  const setSelectedDirection = useCvDataStore((s) => s.changeWorkDirection);
  const handleDirectionBlur = useCvDataStore((s) => s.blurWorkDirection);
  const directionHasError =
    selectedDirection.value === null && selectedDirection.wasBlurred;

  const selectedJobPosition = useCvDataStore((s) => s.cvData.jobPosition);
  const setSelectedJobPosition = useCvDataStore((s) => s.changeJobPosition);
  const handleJobPositionBlur = useCvDataStore((s) => s.blurJobPosition);
  const [jobPositionInput, setJobPositionInput] = useState("");
  const jobPositionHasError =
    selectedJobPosition.value === null && selectedJobPosition.wasBlurred;

  const handleItemSelected = (val: { id: string; name: string }) => {
    if (val.id === selectedDirection.value?.id) {
      return;
    }
    setSelectedDirection(val);
    setSelectedJobPosition(null);
    setJobPositionInput("");
  };

  const handleJobPositionInputChange = (val: string) => {
    if (selectedDirection === null) {
      return;
    }
    setJobPositionInput(val);
  };
  const normalizedJobPositionInput = jobPositionInput.trim().toLowerCase();

  const shownSuggestions =
    selectedDirection.value === null
      ? []
      : JOB_DIRECTIONS.find(
          (item) => item.id === selectedDirection.value?.id
        )!.positionSuggestions.filter((item) => {
          return item.name
            .trim()
            .toLowerCase()
            .includes(normalizedJobPositionInput);
        });

  return (
    <>
      {/* <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"> */}
      {/*   <ItemSelection */}
      {/*     items={EXPERIENCE_LEVELS} */}
      {/*     selectedItem={ */}
      {/*       experienceLevel.value ?? { id: "-1", name: "Оберіть рівень досвіду" } */}
      {/*     } */}
      {/*     setSelected={handleExperienceLevelChange} */}
      {/*     onBlur={handleExperienceLevelBlur} */}
      {/*     label="Рівень досвіду" */}
      {/*     errors={experienceLevelHasError ? ["Оберіть рівень досвіду"] : []} */}
      {/*   /> */}
      {/* </div> */}

      <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <ItemSelection
          items={items}
          selectedItem={
            selectedDirection.value ?? { id: "-1", name: "Оберіть напрямок" }
          }
          setSelected={handleItemSelected}
          onBlur={handleDirectionBlur}
          label="Напрямок роботи"
          errors={directionHasError ? ["Оберіть напрямок"] : []}
        />
      </div>

      <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <AutocompleteCombobox
          label="Посада"
          placeholder="Почніть вводити посаду"
          disabled={selectedDirection.value === null}
          onBlur={handleJobPositionBlur}
          items={shownSuggestions}
          selectedItem={selectedJobPosition.value ?? DEFAULT_JOB_POSITION}
          setSelectedItem={setSelectedJobPosition}
          setQuery={handleJobPositionInputChange}
          errors={jobPositionHasError ? ["Оберіть посаду"] : []}
        />
      </div>
    </>
  );
}

const DEFAULT_JOB_POSITION = { id: "-1", name: "" };
