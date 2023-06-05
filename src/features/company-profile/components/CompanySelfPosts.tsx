import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import PrimaryButton from "@/components/ui/PrimaryButton";
import AddOrEditPostForm from "@/features/posts/components/AddPostForm";
import RemovePostDialog from "@/features/posts/components/RemovePostDialog";
import SelfPostItem from "@/features/posts/components/SelfPostItem";
import {
  BriefPost,
  useSelfPostsQuery,
} from "@/features/posts/hooks/use-self-posts-query";
import { useDialogActionsPaginatedListReducer } from "@/hooks/useDialogActionsListReducer";
import parseUnknownError from "@/lib/parse-unknown-error";
import { Fragment } from "react";

export default function CompanySelfPosts() {
  const { data, isLoading, isError, error } = useSelfPostsQuery();
  const { state, remove, add, close } =
    useDialogActionsPaginatedListReducer<BriefPost>();
  const { dialog, focusedItem } = state;
  const noData =
    data === undefined ||
    data.pages[0] === undefined ||
    data.pages[0].data.length === 0;

  return (
    <div className="flow-root">
      <RemovePostDialog
        postId={focusedItem?.id ?? ""}
        postText={focusedItem?.text ?? ""}
        show={dialog === "remove"}
        onClose={close}
      />
      <AddOrEditPostForm show={dialog === "add"} onClose={close} />

      <PrimaryButton onClick={add} className="mb-4">
        {"Додати публікацію"}
      </PrimaryButton>
      {isLoading ? (
        <CenteredLoadingSpinner />
      ) : isError ? (
        <p className="text-center text-red-600">{parseUnknownError(error)}</p>
      ) : noData ? (
        <p className="text-center text-gray-500 py-12">{"Немає публікацій"}</p>
      ) : (
        <ul role="list" className="space-y-4">
          {data.pages.map((page, pageIdx) => (
            <Fragment key={pageIdx}>
              {page.data.map((post, postIdx) => (
                <SelfPostItem
                  key={postIdx}
                  {...post}
                  onRemove={() => remove(post, postIdx, pageIdx)}
                />
              ))}
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  );
}
