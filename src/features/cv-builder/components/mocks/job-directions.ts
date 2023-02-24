export const JOB_DIRECTIONS = [
  {
    id: "1",
    name: "Software Development",
    positionSuggestions: [
      "Dotnet Developer",
      "Java Developer",
      "Python Developer",
      "PHP Developer",
      "Ruby Developer",
      "C++ Developer",
      "JavaScript Developer",
      "Frontend Developer",
      "Backend Developer",
    ],
  },
  {
    id: "2",
    name: "Data Science",
    positionSuggestions: [
      "Data Scientist",
      "Data Analyst",
      "Data Engineer",
      "Machine Learning Engineer",
      "Data Architect",
      "Data Visualization Engineer",
      "Data Science Manager",
    ],
  },
  {
    id: "3",
    name: "DevOps",
    positionSuggestions: [
      "DevOps Engineer",
      "DevOps Architect",
      "DevOps Manager",
      "DevOps Consultant",
      "DevOps Developer",
      "DevOps Specialist",
      "DevOps Analyst",
    ],
  },
  {
    id: "4",
    name: "Customer Support",
    positionSuggestions: [
      "Customer Support Specialist",
      "Customer Support Manager",
      "Customer Support Engineer",
      "Customer Support Representative",
      "Customer Support Analyst",
      "Customer Support Consultant",
      "Customer Support Agent",
    ],
  },
] as const;

export const SELECTION_ITEMS = JOB_DIRECTIONS.map((direction) => ({
  id: direction.id,
  name: direction.name,
}));
