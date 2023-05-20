import { z } from "zod";

export const PostSchema = z.object({
    id: z.string(),
    text: z.string(),
    createdDate: z.string(),
    images: z.array(z.string()),
    likes: z.number(),
    account: z.object({
        id: z.string(),
        name: z.string(),
        image: z.string().nullable(),
        role: z.string(),
    }),
    isLiked: z.boolean(),
});

export const PostArraySchema = z.array(PostSchema);

export type Post = z.infer<typeof PostSchema>;
