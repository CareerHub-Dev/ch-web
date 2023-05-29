import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import useToast from "@/hooks/useToast";
import { deleteStudentWorkExperience } from "@/lib/api/student";
import parseUnknownError from "@/lib/parse-unknown-error";
import { useQueryClient } from "@tanstack/react-query";

export default function DeleteExperienceForm({
  id,
  title,
  onCancel,
  onSuccess,
}: {
  id: string;
  title: string;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useProtectedMutation(
    ["delete-experience", id],
    deleteStudentWorkExperience,
    {
      onSuccess() {
        toast.success("Досвід успішно видалено");
        queryClient.invalidateQueries(["student-experiences", "self"]);
        onSuccess();
      },
      onError(err) {
        toast.error("Помилка: " + parseUnknownError(err));
      },
    }
  );

  const handleConfirm = () => {
    mutate(id);
  };

  return (
    <>
      <p>
        {"Ви впевнені, що хочете видалити досвід роботи "}
        <b>{title}</b>
        {"?"}
      </p>

      <DialogActionButtons
        onConfirm={handleConfirm}
        onCancel={onCancel}
        confirmationDisabled={isLoading}
        cancelText={"Відміна"}
        confirmText={"Видалити"}
        confirmColor="red"
        isLoading={isLoading}
      />
    </>
  );
}
