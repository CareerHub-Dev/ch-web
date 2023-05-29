import { ConfirmCancelDialog } from "@/components/ui/ConfirmCancelDialog";

export default function RemoveItemModal({
  title,
  descriptionText,
  onClose,
  onConfirm,
}: {
  title: string;
  descriptionText: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <ConfirmCancelDialog
      title={title}
      confirmText={"Так, видалити"}
      cancelText="Ні"
      onClose={onClose}
      onConfirm={onConfirm}
      confirmClasses="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
      show
    >
      <p className="mt-4 text-sm text-gray-500">{descriptionText}</p>
    </ConfirmCancelDialog>
  );
}
