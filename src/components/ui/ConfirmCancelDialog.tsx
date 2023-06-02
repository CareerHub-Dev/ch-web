import { ReactNode } from "react";
import DialogActionButtons from "./dialog/DialogActionButtons";
import DialogWithBackdrop from "./dialog/DialogWithBackdrop";

export default function ConfirmCancelDialog({
  title,
  children,
  cancelText,
  confirmText,
  confirmationDisabled,
  confirmColor,
  show,
  isLoading,
  onClose,
  onCancel,
  onConfirm,
}: {
  title: string;
  children?: ReactNode;
  cancelText?: string;
  confirmText?: string;
  confirmationDisabled?: boolean;
  confirmColor?: Parameters<typeof DialogActionButtons>[0]["confirmColor"];
  show: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm: () => void;
}) {
  return (
    <DialogWithBackdrop show={show} onClose={onClose} title={title}>
      {children}
      <DialogActionButtons
        onCancel={onCancel ?? onClose}
        onConfirm={onConfirm}
        cancelText={cancelText}
        confirmText={confirmText}
        confirmationDisabled={confirmationDisabled}
        confirmColor={confirmColor}
        isLoading={isLoading}
      />
    </DialogWithBackdrop>
  );
}
