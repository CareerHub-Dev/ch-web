import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import PostsTabsForStudent from "@/features/posts/components/PostsTabsForStudent";
import { usePostsTabsForStudent } from "@/features/posts/hooks/use-posts-tabs-for-student";
import { useBoolean } from "usehooks-ts";
import AddPostForm from "@/features/posts/components/AddPostForm";
import PrimaryButton from "@/components/ui/PrimaryButton";
import PostsFromFollowedAccounts from "@/features/posts/components/PostsFromFollowedAccounts";

export default function PostsPage() {
  const { currentTab, changeTab } = usePostsTabsForStudent();
  const addPostDialogIsOpen = useBoolean(false);

  return (
    <>
      <AddPostForm
        show={addPostDialogIsOpen.value}
        onClose={addPostDialogIsOpen.setFalse}
        onSuccess={() => changeTab("self")}
      />
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {"Публікації"}
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <PrimaryButton size="xl" onClick={addPostDialogIsOpen.setTrue}>
            {"Додати"}
          </PrimaryButton>
        </div>
      </div>
      <div className="mt-8">
        <PostsTabsForStudent />
      </div>
      {currentTab === "self" ? <p>self</p> : <PostsFromFollowedAccounts />}
    </>
  );
}

PostsPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Student"],
});
