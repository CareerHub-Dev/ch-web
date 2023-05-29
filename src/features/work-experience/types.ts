export type WorkExperience = {
  title: string;
  companyName: string;
  jobType: string;
  workFormat: string;
  experienceLevel: string;
  jobLocation: string | null;
  startDate: string;
  endDate: string | null;
};

export type WorkExperienceInputValues = {
  title: string;
  companyName: string;
  jobType: { name: string; id: string };
  workFormat: { name: string; id: string };
  experienceLevel: { name: string; id: string };
  jobLocation: string;
  startYear: { name: string; id: string };
  startMonth: { name: string; id: string };
  endYear: { name: string; id: string };
  endMonth: { name: string; id: string };
  isCurrent: boolean;
  isRemote: boolean;
};
