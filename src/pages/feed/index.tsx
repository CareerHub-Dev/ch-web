import CommonLayout from "@/components/layout/CommonLayout";
import { protectedSsr } from "@/lib/protected-ssr";
import { useBoolean } from "usehooks-ts";
import AddPostForm from "@/features/posts/components/AddPostForm";
import PrimaryButton from "@/components/ui/PrimaryButton";
import PostsFromFollowedAccounts from "@/features/posts/components/PostsFromFollowedAccounts";
import StudentOwnPosts from "@/features/posts/components/StudentOwnPosts";
import { useStudentFeedTabs } from "@/features/student-feed/hooks/use-student-feed-tabs";
import StudentFeedTabs from "@/features/student-feed/components/StudentFeedTabs";
import StudentApplicationsReviews from "@/features/student-feed/components/StudentApplicationsReviews";

export default function FeedPage() {
  const { currentTab, changeTab } = useStudentFeedTabs();
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
            {"Стрічка"}
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <PrimaryButton size="xl" onClick={addPostDialogIsOpen.setTrue}>
            {"Додати публікацію"}
          </PrimaryButton>
        </div>
      </div>
      <div className="mt-8">
        <StudentFeedTabs />
      </div>
      {currentTab === "self" ? (
        <StudentOwnPosts />
      ) : currentTab === "applications-reviews" ? (
        <StudentApplicationsReviews />
      ) : (
        <PostsFromFollowedAccounts />
      )}
    </>
  );
}

FeedPage.getLayout = CommonLayout;

export const getServerSideProps = protectedSsr({
  allowedRoles: ["Student"],
});
