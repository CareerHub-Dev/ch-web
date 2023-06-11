import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import { useAcceptStudentApplicationMutation } from "@/features/student-applications/hooks/use-application-review-query";
import ValidatedTextArea from "@/components/ui/ValidatedTextArea";
import { useInput } from "@/hooks/useInput";
import { useBoolean } from "usehooks-ts";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

export default function ReviewAcceptDialog({
  reviewId,
  onClose,
  show,
}: {
  reviewId: string;
  onClose: () => void;
  show: boolean;
}) {
  const acceptMutation = useAcceptStudentApplicationMutation();
  const noFeedback = useBoolean(false);
  const messageInput = useInput({
    initialValue: "",
    validators: [
      (val) => {
        if (noFeedback.value) {
          return { type: "success" };
        }
        if (val.length === 0) {
          return { type: "error", message: "Введіть відгук" };
        }
        return { type: "success" };
      },
    ],
  });

  const handleSubmit = async () => {
    if (!messageInput.isValid) {
      messageInput.blur();
      return;
    }
    await acceptMutation.mutateAsync({
      reviewId,
      message: "",
    });
    onClose();
  };

  const handleNoFeedbackToggle = () => {
    noFeedback.toggle();
    messageInput.blur();
  };

  return (
    <DialogWithBackdrop
      panelSize="sm"
      show={show}
      onClose={onClose}
      title={"Прийняти подання"}
    >
      <hr className="my-4" />
      <div className="flex flex-col gap-4">
        <div>
          <label
            id="feedback-message-label"
            htmlFor="feedback-message"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            {"Відгук"}
          </label>
          <ValidatedTextArea
            id="feedback-message"
            {...messageInput}
            onChange={messageInput.change}
            onBlur={messageInput.blur}
            disabled={noFeedback.value}
          />
        </div>
        <ToggleSwitch
          label={"Не залишати відгук"}
          checked={noFeedback.value}
          toggle={handleNoFeedbackToggle}
        />
      </div>
      <DialogActionButtons
        confirmText="Прийняти"
        onCancel={onClose}
        onConfirm={handleSubmit}
        isLoading={acceptMutation.isLoading}
      />
    </DialogWithBackdrop>
  );
}
