import useProtectedMutation from "@/hooks/useProtectedMutation";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCv } from "@/lib/api/cvs";
import useToast from "@/hooks/useToast";
import { useStudentCvsStore } from "../store/student-cvs-store";
import parseUnknownError from "@/lib/parse-unknown-error";
import ConfirmCancelDialog from "@/components/ui/ConfirmCancelDialog";
import { removeFromPaginatedCache } from "@/lib/paginated-cache";

export default function RemoveCvDialog({
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
  const search = useStudentCvsStore((s) => s.search);
  const { mutate, isLoading } = useProtectedMutation(
    ["delete-cv", cvId],
    deleteCv,
    {
      onMutate: async (removedItemId) => {
        await queryClient.cancelQueries({ queryKey: ["student-own-cvs"] });
        const cachedData = queryClient.getQueryData([
          "student-own-cvs",
          search,
        ]);

        queryClient.setQueryData(
          ["student-own-cvs"],
          removeFromPaginatedCache(cachedData, removedItemId)
        );

        onClose();
        return () => {
          queryClient.setQueryData(["student-own-cvs"], cachedData);
        };
      },
      onSettled: () => {
        queryClient.invalidateQueries(["student-own-cvs"]);
      },
      onError: (error, _variables, restoreCache) => {
        if (restoreCache !== undefined) {
          restoreCache();
        }
        toast.error(parseUnknownError(error));
      },
    }
  );

  const handleConfirm = () => {
    mutate(cvId);
  };

  return (
    <ConfirmCancelDialog
      show={show}
      onConfirm={handleConfirm}
      onClose={onClose}
      title={`Видалити резюме '${title}'?`}
      cancelText={"Ні"}
      confirmText={"Так"}
      confirmColor="red"
      isLoading={isLoading}
      confirmationDisabled={isLoading}
    />
  );
}
