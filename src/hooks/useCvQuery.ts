import useProtectedQuery from './useProtectedQuery';
import { useQueryClient } from '@tanstack/react-query';

export type CvQueryData = {
  title: string;
  templateLanguage: string;
  jobPosition: {
    id: string;
    name: string;
  };
  goals: string;
  skillsAndTechnologies: string;
  experienceHighlights: string;
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
