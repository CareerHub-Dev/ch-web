import { useWorkExperienceInputs } from "@/features/work-experience/hooks/use-work-experience-inputs";
import WorkExperienceForm from "@/features/work-experience/components/WorkExperienceForm";
import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import { updateStudentWorkExperience } from "@/lib/api/student";
import useToast from "@/hooks/useToast";
import parseUnknownError from "@/lib/parse-unknown-error";
import { useQueryClient } from "@tanstack/react-query";
import { WorkExperience } from "@/features/work-experience/types";

export default function EditExperienceForm({
  updatedItem,
  onCancel,
  onSuccess,
}: {
  updatedItem: (WorkExperience & { id: string }) | undefined;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useProtectedMutation(
    ["update-experience", updatedItem?.id],
    updateStudentWorkExperience,
    {
      onSuccess() {
        toast.success("Досвід успішно оновлено");
        queryClient.invalidateQueries(["student-experiences", "self"]);
        onSuccess();
      },
      onError(err) {
        toast.error("Помилка: " + parseUnknownError(err));
      },
    }
  );
  const workExperienceInputs = useWorkExperienceInputs(updatedItem);
  const {
    thereAreSomeBlurredErrors,
    thereAreSomeInvalidInputs,
    blurAll,
    values,
  } = workExperienceInputs;

  const handleConfirm = () => {
    if (updatedItem === undefined) return;
    if (thereAreSomeInvalidInputs) {
      blurAll();
      return;
    }
    mutate({ ...values, id: updatedItem.id });
  };

  return (
    <>
      <WorkExperienceForm {...workExperienceInputs} />
      <DialogActionButtons
        onConfirm={handleConfirm}
        onCancel={onCancel}
        confirmationDisabled={thereAreSomeBlurredErrors || isLoading}
        cancelText={"Відміна"}
        confirmText={"Зберегти"}
        isLoading={isLoading}
      />
    </>
  );
}
