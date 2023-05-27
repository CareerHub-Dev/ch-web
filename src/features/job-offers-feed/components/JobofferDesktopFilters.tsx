import {
    experienceLevelOptions,
    jobTypeOptions,
    workFormatOptions,
} from "@/lib/enums";
import { useJobOffersFeedStore } from "../store/job-offers-feed-store";
import { selectFilters } from "../store/job-offers-feed-store/selectors";
import ItemSelection from "@/components/ui/ItemsSelection";

export default function JobOfferDesktopFilters() {
    const {
        workFormat,
        setWorkFormat,
        jobType,
        setJobType,
        experienceLevel,
        setExperienceLevel,
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
        </form>
    );
}
