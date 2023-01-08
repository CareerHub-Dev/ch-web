import { ConfirmCancelDialog } from '../../ui/ConfirmCancelDialog';
import { type ReactNode } from 'react';

export default function AddOrEditItemModal({
  type,
  children,
  confirmationDisabled,
  onClose,
  onConfirm,
}: {
  type: 'add' | 'edit';
  children: ReactNode;
  confirmationDisabled?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const { title, confirmText } = getModalAssets(type);

  return (
    <ConfirmCancelDialog
      title={title}
      confirmText={confirmText}
      cancelText="Відміна"
      confirmationDisabled={confirmationDisabled}
      onClose={onClose}
      onConfirm={onConfirm}
      show
    >
      {children}
    </ConfirmCancelDialog>
  );
}

function getModalAssets(type: 'add' | 'edit'): {
  title: string;
  confirmText: string;
} {
  return type === 'add'
    ? { title: 'Додати до списку', confirmText: 'Додати' }
    : { title: 'Редагувати', confirmText: 'Зберегти' };
}
