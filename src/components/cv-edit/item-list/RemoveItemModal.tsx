import { ConfirmCancelDialog } from '../../ui/ConfirmCancelDialog';

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
      confirmText={'Так, видалити'}
      cancelText="Ні"
      onClose={onClose}
      onConfirm={onConfirm}
      show
    >
      <p className="mt-4 text-sm text-gray-500">{descriptionText}</p>
    </ConfirmCancelDialog>
  );
}
