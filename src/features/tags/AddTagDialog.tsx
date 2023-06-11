import ValidatedInput from "@/components/ui/ValidatedInput";
import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import { useInput } from "@/hooks/useInput";
import { fillThisFieldValidator } from "@/lib/util";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import { addTag } from "@/lib/api/tags";
import useToast from "@/hooks/useToast";
import parseUnknownError from "@/lib/parse-unknown-error";
import { useQueryClient } from "@tanstack/react-query";

export default function AddTagDialog({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const toast = useToast();
  const client = useQueryClient();
  const addTagMutation = useProtectedMutation(["add-tag"], addTag);
  const tagInput = useInput({
    validators: [fillThisFieldValidator("Введіть назву тегу")],
  });

  const handleSubmit = () => {
    if (!tagInput.isValid) {
      tagInput.blur();
      return;
    }

    addTagMutation.mutate(tagInput.value, {
      onSuccess: (_data, tagName) => {
        toast.success(`Тег "${tagName}" успішно додано`);
        tagInput.reset();
        client.invalidateQueries(["tags"]);
        onClose();
      },
      onError: (error) => {
        toast.error(parseUnknownError(error));
      },
    });
  };

  return (
    <DialogWithBackdrop show={show} onClose={onClose}>
      <ValidatedInput
        {...tagInput}
        id="tag-name"
        name="tag-name"
        label="Назва тегу"
        placeholder="Введіть назву тегу"
        onChange={tagInput.change}
        onBlur={tagInput.blur}
        disabled={addTagMutation.isLoading}
      />
      <DialogActionButtons
        isLoading={addTagMutation.isLoading}
        confirmText={"Додати тег"}
        onConfirm={handleSubmit}
        onCancel={onClose}
      />
    </DialogWithBackdrop>
  );
}
