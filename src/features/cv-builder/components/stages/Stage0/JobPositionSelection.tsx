import ItemSelection from "@/components/ui/ItemsSelection";
import AutocompleteCombobox from "@/components/ui/AutocompleteCombobox";
import { useState } from "react";
import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";
import {
  useJobDirectionsQueryData,
  useJobPositionsByJobDirectionQuery,
} from "@/hooks/requests/job-directions";
import LoadingInput from "../../LoadingInput";
import LockedJobPositions from "../../LockedJobPositions";
import { experienceLevelOptions } from "@/lib/enums";

export default function JobPositionSelection() {
  const items = useJobDirectionsQueryData();

  const selectedDirection = useCvDataStore((s) => s.cvData.workDirection);
  const setSelectedDirection = useCvDataStore((s) => s.changeWorkDirection);
  const handleDirectionBlur = useCvDataStore((s) => s.blurWorkDirection);
  const selectedJobPosition = useCvDataStore((s) => s.cvData.jobPosition);
  const setSelectedJobPosition = useCvDataStore((s) => s.changeJobPosition);
  const handleJobPositionBlur = useCvDataStore((s) => s.blurJobPosition);
  const selectedExperienceLevel = useCvDataStore(
    (s) => s.cvData.experienceLevel
  );
  const handleExperienceLevelChange = useCvDataStore(
    (s) => s.changeExperienceLevel
  );
  const handleExperienceLevelBlur = useCvDataStore(
    (s) => s.blurExperienceLevel
  );
  const [jobPositionInput, setJobPositionInput] = useState("");

  const {
    data: jobPositionsData,
    isLoading,
    isError,
  } = useJobPositionsByJobDirectionQuery(selectedDirection?.value?.id || "", {
    enabled: selectedDirection !== null,
  });

  const directionHasError =
    selectedDirection.value === null && selectedDirection.wasBlurred;
  const jobPositionHasError =
    selectedJobPosition.value === null && selectedJobPosition.wasBlurred;
  const experienceLevelHasError =
    selectedExperienceLevel.value === null &&
    selectedExperienceLevel.wasBlurred;

  const handleItemSelected = (val: {
    id: string;
    name: string;
    recomendedTemplateLanguage: string;
  }) => {
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
    selectedDirection.value === null || jobPositionsData === undefined
      ? []
      : jobPositionsData.filter((item) => {
          return item.name
            .trim()
            .toLowerCase()
            .includes(normalizedJobPositionInput);
        });

  return (
    <>
      <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <ItemSelection
          items={experienceLevelOptions}
          selectedItem={
            selectedExperienceLevel.value ?? {
              id: "-1",
              name: "Оберіть рівень досвіду",
            }
          }
          setSelected={handleExperienceLevelChange}
          onBlur={handleExperienceLevelBlur}
          label={"Рівень досвіду"}
          errors={experienceLevelHasError ? ["Оберіть рівень досвіду"] : []}
        />
      </div>

      <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        <ItemSelection
          items={items}
          selectedItem={
            selectedDirection.value ?? {
              id: "-1",
              name: "Оберіть напрямок",
              recomendedTemplateLanguage: "",
            }
          }
          setSelected={handleItemSelected}
          onBlur={handleDirectionBlur}
          label="Напрямок роботи"
          errors={directionHasError ? ["Оберіть напрямок"] : []}
        />
      </div>

      <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
        {selectedDirection.value === null ? (
          <LockedJobPositions />
        ) : isLoading ? (
          <LoadingInput label="Посада" />
        ) : isError ? (
          <div>Помилка при завантаженні</div>
        ) : (
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
        )}
      </div>
    </>
  );
}

const DEFAULT_JOB_POSITION = { id: "-1", name: "" };
