import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";

export default function RemoveLinkDialog({
  linkTitle,
  show,
  onClose,
  onConfirm,
}: {
  linkTitle: string;
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return (
    <DialogWithBackdrop
      title="Видалити посилання?"
      show={show}
      onClose={onClose}
    >
      <div className="text-sm text-gray-500">
        {"Ви впевнені, що хочете видалити посилання"}
        <span className="font-semibold">{linkTitle}</span>
        {"?"}
      </div>
      <DialogActionButtons
        onConfirm={handleConfirm}
        confirmColor="red"
        onCancel={onClose}
      />
    </DialogWithBackdrop>
  );
}
