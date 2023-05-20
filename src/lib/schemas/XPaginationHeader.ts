import { z } from "zod";

const XPaginationHeaderSchema = z.object({
    CurrentPage: z.number(),
    PageSize: z.number(),
    TotalCount: z.number(),
    TotalPages: z.number(),
    HasPrevious: z.boolean(),
    HasNext: z.boolean(),
});
export default XPaginationHeaderSchema;

export type XPaginationHeader = z.infer<typeof XPaginationHeaderSchema>;
