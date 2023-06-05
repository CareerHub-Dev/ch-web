import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { getStudentOwnCvs } from "@/lib/api/cvs";

export function useCvsQuery(search: string) {
  return useProtectedPaginatedQuery({
    queryKey: ["student-own-cvs", search],
    getItems: getStudentOwnCvs,
    params: {
      pageSize: 36,
      search,
    },
  });
}
