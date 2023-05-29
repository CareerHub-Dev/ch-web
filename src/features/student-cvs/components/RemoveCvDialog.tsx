import useProtectedMutation from "@/hooks/useProtectedMutation";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCv } from "@/lib/api/cvs";
import useToast from "@/hooks/useToast";
import parseUnknownError from "@/lib/parse-unknown-error";
import { ConfirmCancelDialog } from "@/components/ui/ConfirmCancelDialog";

export function RemoveCvDialog({
  cvId,
  show,
  onClose,
  title,
}: {
  cvId: string;
  show: boolean;
  onClose: () => void;
  title: string;
}) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate } = useProtectedMutation(["delete-cv", cvId], deleteCv, {
    onMutate: async (removedItemId) => {
      await queryClient.cancelQueries({ queryKey: ["student-own-cvs"] });

      type CachedData = {
        pages: { data: { id: string }[] }[];
      };
      const cachedData = queryClient.getQueryData([
        "student-own-cvs",
      ]) as CachedData; // | undefined;

      const cachedDataWithoutRemovedCv = {
        ...cachedData,
        pages: cachedData.pages.map((page) => ({
          ...page,
          data: page.data.filter((item) => item.id !== removedItemId),
        })),
      };

      onClose();
      queryClient.setQueryData(["student-own-cvs"], cachedDataWithoutRemovedCv);

      return () => {
        queryClient.setQueryData(["student-own-cvs"], cachedData);
      };
    },
    onSettled: () => {
      queryClient.invalidateQueries(["student-own-cvs"]);
    },
    onError: (error, _variables, restoreCache) => {
      if (!!restoreCache) restoreCache();
      toast.error(parseUnknownError(error));
    },
  });

  const handleConfirm = () => {
    mutate(cvId);
  };

  return (
    <>
      <ConfirmCancelDialog
        show={show}
        onConfirm={handleConfirm}
        onClose={onClose}
        title={`Видалити резюме '${title}'?`}
        cancelText={"Ні"}
        confirmText={"Так"}
        confirmClasses="bg-red-600 text-white focus:ring-red-500"
      />
    </>
  );
}
