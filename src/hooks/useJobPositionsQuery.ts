import { useProtectedQuery } from "./useProtectedQuery";
import { getJobPositions } from "@/lib/api/job-positions";
import { useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { JobPositionArray } from "@/lib/api/job-positions/schema";

const JOB_POSITIONS_QUERY_KEY = ["jobPositions"];

const useJobPositionsQuery = (
  options?: Omit<
    UseQueryOptions<JobPositionArray, unknown, JobPositionArray, string[]>,
    "queryKey" | "queryFn"
  >
) => {
  return useProtectedQuery<string[], JobPositionArray>(
    JOB_POSITIONS_QUERY_KEY,
    getJobPositions,
    {
      ...options,
    }
  );
};

export default useJobPositionsQuery;

export const useJobPositionsQueryData = () => {
  const client = useQueryClient();
  return client.getQueryData(JOB_POSITIONS_QUERY_KEY) as
    | JobPositionArray
    | undefined;
};
