import { useProtectedPaginatedQuery } from "@/hooks/useProtectedPaginatedQuery";
import { request } from "@/lib/axios";
import { AxiosInstance } from "axios";
import { parsePaginatedResponseAsync } from "@/lib/api/pagination";
import { z } from "zod";
import { UserRole } from "@/lib/schemas/UserRole";
import useSession from "@/hooks/useSession";

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

export const BriefPostSchema = PostSchema.pick({
  id: true,
  text: true,
  createdDate: true,
  images: true,
  likes: true,
  account: true,
});

export const PostArraySchema = z.array(PostSchema);
export const BriefPostArraySchema = z.array(BriefPostSchema);
export type Post = z.infer<typeof PostSchema>;
export type BriefPost = z.infer<typeof BriefPostSchema>;


export function getPostsFromAccount(
  instance: AxiosInstance,
  params: Omit<PaginatedRequestParams, "pageNumber"> & { accountId: string }
) {
  const { accountId, ...rest } = params;
  return request({
    instance,
    url: `/Student/Posts/of-account/${accountId}`,
    params: rest,
    select: parsePaginatedResponseAsync(PostArraySchema),
  });
}

export function getSelfPosts(
  instance: AxiosInstance,
  {
    role,
    ...params
  }: Omit<PaginatedRequestParams, "pageNumber"> & { role: UserRole }
) {
  let url = "Company/Posts/self";
  if (role === "Student") {
    url = "Student/Posts/self";
  }
  return request({
    instance,
    url,
    params,
    select: parsePaginatedResponseAsync(BriefPostArraySchema),
  });
}

export function useSelfPostsQuery() {
  const { data: session } = useSession();
  const role = session?.role ?? "Student";
  return useProtectedPaginatedQuery({
    queryKey: ["posts", "self"],
    getItems: getSelfPosts,
    params: {
      pageSize: 36,
      role,
    },
  });
}
