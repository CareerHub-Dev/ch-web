import { useQuery } from "@tanstack/react-query";

export const HARD_SKILLS = [
  "C++",
  "JavaScript",
  "Rust",
  "Go",
  "Golang",
  "JS",
  "TypeScript",
  "Testing",
];

export const SOFT_SKILLS = [
  "Teamwork",
  "Communication",
  "Leadership",
  "Problem Solving",
  "Time Management",
];

//**
//* Mock function to simulate fetching skills from an API
//* @param searchTerm - The search term to filter the skills by
//* @returns A promise that resolves to an array of skills
function fetchSkills(searchTerm: string, type: "hard" | "soft") {
  const arrayToUse = type === "hard" ? HARD_SKILLS : SOFT_SKILLS;
  return new Promise<string[]>((resolve) => {
    setTimeout(() => {
      resolve(
        arrayToUse.filter((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 200);
  });
}

export function useSkillsQuery(searchTerm: string, type: "hard" | "soft") {
  return useQuery(["skills", searchTerm, type], () =>
    fetchSkills(searchTerm, type), {
      enabled: searchTerm.length > 0,
    }
  );
}
