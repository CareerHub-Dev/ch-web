import { useProtectedQuery } from './useProtectedQuery';
import { useQueryClient } from '@tanstack/react-query';

export type CvQueryData = {
  id: string;
  title: string;
  created: string;
  modified: string;
  jobPosition: {
    id: string;
    name: string;
  };
  templateLanguage: string;
  lastName: string;
  firstName: string;
  photo: string;
  goals: string;
  skillsAndTechnologies: string;
  experienceHighlights: string;
  studentId: string;
  foreignLanguages: Array<{
    name: string;
    languageLevel: string;
  }>;
  projectLinks: Array<{
    title: string;
    url: string;
  }>;
  educations: Array<{
    university: string;
    city: string;
    country: string;
    speciality: string;
    degree: string;
    startDate: string;
    endDate: string;
  }>;
};

export function useCvQuery({
  cvId,
  initialData,
}: {
  cvId: string;
  initialData: CvQueryData;
}) {
  return useProtectedQuery(
    ['cv', cvId],
    async () => ({
      title: 'string',
    }),
    {
      initialData,
    }
  );
}

export function useCvQueryData(cvId: string | null) {
  const queryClient = useQueryClient();
  if (!cvId) return null;
  return queryClient.getQueryData(['cv', cvId]) as CvQueryData;
}
