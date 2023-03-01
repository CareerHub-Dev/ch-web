export const EXPERIENCE_LEVELS = [
  { id: "1", name: "Junior" },
  { id: "2", name: "Middle" },
  { id: "3", name: "Senior" },
  { id: "4", name: "Principal" },
]

export const JOB_DIRECTIONS = [
  {
    id: "1",
    name: "Software Development",
    positionSuggestions: [
      { id: "1", name: "Dotnet Developer" },
      { id: "2", name: "Java Developer" },
      { id: "3", name: "Python Developer" },
      { id: "4", name: "PHP Developer" },
      { id: "5", name: "Ruby Developer" },
      { id: "6", name: "C++ Developer" },
      { id: "7", name: "C# Developer" },
      { id: "8", name: "C Developer" },
    ],
  },
  {
    id: "2",
    name: "Data Science",
    positionSuggestions: [
      { id: "1", name: "Data Scientist" },
      { id: "2", name: "Data Analyst" },
      { id: "3", name: "Data Engineer" },
      { id: "4", name: "Machine Learning Engineer" },
      { id: "5", name: "Data Architect" },
      { id: "6", name: "Data Visualization Engineer" },
      { id: "7", name: "Data Science Manager" },
    ],
  },
  {
    id: "3",
    name: "DevOps",
    positionSuggestions: [
      { id: "1", name: "DevOps Engineer" },
      { id: "2", name: "DevOps Architect" },
      { id: "3", name: "DevOps Manager" },
    ],
  },
  {
    id: "4",
    name: "Customer Support",
    positionSuggestions: [
      { id: "1", name: "Customer Support Manager" },
      { id: "2", name: "Customer Support Engineer" },
      { id: "3", name: "Customer Support Specialist" },
      { id: "4", name: "Customer Support Representative" },
    ],
  },
];

export const SELECTION_ITEMS = JOB_DIRECTIONS.map((direction) => ({
  id: direction.id,
  name: direction.name,
}));
