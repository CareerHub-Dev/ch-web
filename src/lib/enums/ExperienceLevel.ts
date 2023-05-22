export enum ExperienceLevel {
    Intern = "Intern",
    Trainee = "Trainee",
    Junior = "Junior",
    Middle = "Middle",
    Senior = "Senior",
}

export const experienceLevelOptions = [
    { name: "Trainee", id: ExperienceLevel.Trainee },
    { name: "Intern", id: ExperienceLevel.Intern },
    { name: "Junior", id: ExperienceLevel.Junior },
    { name: "Middle", id: ExperienceLevel.Middle },
    { name: "Senior", id: ExperienceLevel.Senior },
] as { id: string; name: string }[];
