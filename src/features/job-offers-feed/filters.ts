import {
    experienceLevelOptions,
    jobTypeOptions,
    workFormatOptions,
} from "@/lib/enums";

export const filters = [
    {
        id: "workFormat",
        name: "Формат",
        options: workFormatOptions,
    },
    {
        id: "jobType",
        name: "Тип роботи",
        options: jobTypeOptions,
    },
    {
        id: "experienceLevel",
        name: "Рівень досвіду",
        options: experienceLevelOptions,
    },
];
