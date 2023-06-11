import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import { InferGetServerSidePropsType } from "next";
import { usePostQuery } from "@/features/posts/hooks/use-post-query";
import PostItem from "@/features/posts/components/PostItem";
import SelfPostItem from "@/features/posts/components/SelfPostItem";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";

export default function PostDetailsPage({
  isSelf,
  postId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading, isError, error } = usePostQuery(postId);
  if (isLoading) {
    return <CenteredLoadingSpinner />;
  }
  if (isError) {
    return (
      <p className="text-center text-red-600">{parseUnknownError(error)}</p>
    );
  }
  if (isSelf) {
    return (
      <ul>
        <SelfPostItem {...data} onRemove={() => {}} />
      </ul>
    );
  }

  return (
    <ul>
      <PostItem {...data} />
    </ul>
  );
}

PostDetailsPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr<{
  isSelf: boolean;
  postId: string;
}>({
  allowedRoles: ["Student", "Company"],
  getProps: async (ctx) => {
    const postId = ctx.query.postId;

    if (typeof postId !== "string") {
      return {
        notFound: true,
      };
    }

    const { accountId } = ctx.session;
    const isSelf = postId === accountId;

    return {
      props: {
        isSelf,
        postId,
      },
    };
  },
});
