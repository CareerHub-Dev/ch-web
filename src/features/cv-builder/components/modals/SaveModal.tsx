import {
  getStageCompletionStatus,
  someStageHasWarnings,
  transformCvDataToDto,
  useCvDataStore,
} from "../../store/cv-data-store";
import { useCvUiStore } from "../../store/cv-ui-store";
import { useRouter } from "next/router";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import useToast from "@/hooks/useToast";
import { useQueryClient } from "@tanstack/react-query";
import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import { createOrModifyCv } from "@/lib/api/cvs";
import ValidatedInput from "@/components/ui/ValidatedInput";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export function SaveModal() {
  const router = useRouter();
  const cvId = useCvDataStore((s) => s.cvId);
  const closeModal = useCvUiStore((s) => s.closeModal);
  const isOpen = useCvUiStore((s) => s.currentModal) === "save";
  const title = useCvDataStore((state) => state.cvData.title);
  const dispatchTitle = useCvDataStore((s) => s.dispatchTitle);
  const toast = useToast();
  const queryClient = useQueryClient();
  const cvData = useCvDataStore((s) => s.cvData);
  const mutationKey = [cvId === null ? "create-cv" : `modify-cv-${cvId}`];
  const stage0 = useCvDataStore(getStageCompletionStatus(0));
  const someWarnings = useCvDataStore(someStageHasWarnings);

  const cvCanBeSaved =
    stage0 === "complete" ||
    stage0 === "hasWarnings" ||
    (title.errors.length > 0 && title.wasBlurred);

  const { mutate, isLoading } = useProtectedMutation(
    mutationKey,
    createOrModifyCv,
    {
      onSuccess: () => {
        queryClient.refetchQueries(["student-own-cvs"]);
        toast.success("Резюме збережено!");
        router.push("/my-cvs").then((pushed) => {
          if (pushed) {
            closeModal();
          }
        });
      },
      onError: () => {
        toast.error("Не вдалося зберегти резюме");
      },
    }
  );

  const handleTitleChange = (value: string) => {
    dispatchTitle({ type: "CHANGE", value });
  };

  const handleTitleBlur = () => {
    dispatchTitle({ type: "BLUR" });
  };

  const handleConfirm = () => {
    dispatchTitle({ type: "BLUR" });

    if (title.errors.length > 0) {
      return;
    }
    const transformedData = transformCvDataToDto(cvData);
    if (transformedData === null) {
      toast.error("Не можна зберегти резюме без обраної позиції");
      return;
    }
    console.log(transformedData.title);

    if (transformedData.title.length === 0) {
      return;
    }
    mutate({ ...transformedData, id: cvId });
  };

  return (
    <DialogWithBackdrop
      title="Зберегти резюме"
      show={isOpen}
      onClose={closeModal}
    >
      {someWarnings ? (
        <div className="flex items-center justify-center space-x-3 py-2 pl-3 pr-2 sm:text-sm">
          <ExclamationTriangleIcon
            aria-hidden="true"
            className="h-5 w-5 text-orange-500"
          />
          <span className="text-sm text-orange-500 text-center">
            {"Пройдено не всі етапи заповнення резюме"}
          </span>
        </div>
      ) : null}
      <div className="mt-4 flex flex-col gap-1">
        <label htmlFor="cvTitleInput" className="text-gray-500">
          Назва
        </label>
        <ValidatedInput
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          id="title"
          name="title"
          {...title}
        />
      </div>
      <DialogActionButtons
        confirmText="Зберегти"
        confirmationDisabled={isLoading || !cvCanBeSaved}
        isLoading={isLoading}
        onConfirm={handleConfirm}
        onCancel={closeModal}
      />
    </DialogWithBackdrop>
  );
}
