import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";

export default function RemoveItemModal({
  title,
  descriptionText,
  onClose,
  onConfirm,
  show,
}: {
  title: string;
  descriptionText: string;
  onClose: () => void;
  onConfirm: () => void;
  show: boolean;
}) {
  return (
    <DialogWithBackdrop title={title} onClose={onClose} show={show}>
      <p className="mt-4 text-sm text-gray-500">{descriptionText}</p>
      <DialogActionButtons
        onConfirm={onConfirm}
        onCancel={onClose}
        cancelText={"Відміна"}
        confirmText={"Так, видалити"}
        confirmColor="red"
      />
    </DialogWithBackdrop>
  );
}
