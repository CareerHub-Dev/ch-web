export enum JobType {
  FullTime = "Full_time",
  PartTime = "Part_time",
  Contract = "Contract",
}

export const jobTypeOptions = [
  { id: JobType.FullTime, name: "Full time" },
  { id: JobType.PartTime, name: "Part time" },
  { id: JobType.Contract, name: "Контракт" },
] as { id: string; name: string }[];

export function matchJobType(value: string): { id: string; name: string } {
  return (
    jobTypeOptions.find((option) => option.id === value) ?? jobTypeOptions[0]!
  );
}
