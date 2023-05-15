import { ApiRequestConfig } from "@/lib/axios";
import { useApiRequestQuery } from "./useApiRequestQuery";

const getJobPositionsConfig = new ApiRequestConfig({
    url: "Auth/JobPositions",
    method: "GET",
});

const getJobPositionsQueryKey = ["jobPositions"];

export function useJobPositionsQuery(
    options: Parameters<typeof useApiRequestQuery>[2]
) {
    return useApiRequestQuery(
        getJobPositionsQueryKey,
        getJobPositionsConfig,
        options
    );
}
