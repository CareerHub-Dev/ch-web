import { ApiRequestConfig } from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { useApiRequestQuery } from "./useApiRequestQuery";
import { z } from "zod";

const jobDirectionSchema = z.object({
    id: z.string(),
    name: z.string(),
    recomendedTemplateLanguage: z.string(),
});

const jobPositionSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export type JobDirection = z.infer<typeof jobDirectionSchema>;

export type JobPosition = z.infer<typeof jobPositionSchema>;

const getJobDirectionsConfig = new ApiRequestConfig({
    url: "Auth/JobDirections",
    method: "GET",
    select: (response) => {
        return z.array(jobDirectionSchema).parseAsync(response.data);
    },
});

const getJobPoistionsByJobDirectionConfig = new ApiRequestConfig({
    url: "Auth/JobDirections/jobDirectionId/JobPositions",
    method: "GET",
    select: (response) => {
        return z.array(jobPositionSchema).parseAsync(response.data);
    },
});

export function useJobDirectionsQuery(
    options?: Parameters<typeof useApiRequestQuery<string[], JobDirection[]>>[2]
) {
    return useApiRequestQuery(
        ["job-directions"],
        getJobDirectionsConfig,
        options
    );
}

export function useJobDirectionsQueryData() {
    const queryClient = useQueryClient();
    return queryClient.getQueryData(["job-directions"]) as JobDirection[];
}

export function useJobPositionsByJobDirectionQuery(
    jobDirectionId: string,
    options?: Parameters<typeof useApiRequestQuery<string[], JobPosition[]>>[2]
) {
    const config = getJobPoistionsByJobDirectionConfig.withReplacedUrlParts({
        jobDirectionId,
    });
    
    return useApiRequestQuery(
        ["job-positions-by-job-direction", jobDirectionId],
        config,
        options
    );
}
