import {
  experienceLevelOptions,
  jobTypeOptions,
  workFormatOptions,
} from "@/lib/enums";
import { useJobOffersFeedStore } from "../store/job-offers-feed-store";
import { selectFilters } from "../store/job-offers-feed-store/selectors";
import ItemSelection from "@/components/ui/ItemsSelection";
import LargeBadge from "@/components/ui/LargeBadge";
import QueryAutoCompleteCombobox from "@/components/ui/QueryAutocompleteCombobox";
import { getTags } from "@/lib/api/tags";

export default function JobOfferDesktopFilters() {
  const {
    workFormat,
    setWorkFormat,
    jobType,
    setJobType,
    experienceLevel,
    setExperienceLevel,
    tags,
    removeTag,
    addTag,
  } = useJobOffersFeedStore(selectFilters);

  const filters = [
    {
      id: "workFormat",
      name: "Формат",
      options: workFormatOptions,
      setCurrent: setWorkFormat,
      current: workFormat,
    },
    {
      id: "jobType",
      name: "Тип роботи",
      options: jobTypeOptions,
      setCurrent: setJobType,
      current: jobType,
    },
    {
      id: "experienceLevel",
      name: "Рівень досвіду",
      options: experienceLevelOptions,
      setCurrent: setExperienceLevel,
      current: experienceLevel,
    },
  ];
  return (
    <form className="hidden lg:block space-y-4">
      {filters.map((section) => (
        <div key={section.id}>
          <ItemSelection
            label={section.name}
            items={section.options}
            selectedItem={section.current}
            setSelected={section.setCurrent}
            withUnselect={{ id: null, name: "Будь-який" }}
          />
        </div>
      ))}
      <div>
        <QueryAutoCompleteCombobox
          placeholder="Пошук тегів"
          queryKey="tags"
          queryFn={getTags}
          label={"Теги"}
          onSubmit={(tag) => addTag(tag)}
          getItemName={(tag) => tag.name}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.length !== 0 ? (
            tags.map((tag, tagIdx) => (
              <LargeBadge
                key={tagIdx}
                onRemove={() => removeTag(tag)}
                name={tag.name}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500">{"Не обрано тегів"}</p>
          )}
        </div>
      </div>
    </form>
  );
}
