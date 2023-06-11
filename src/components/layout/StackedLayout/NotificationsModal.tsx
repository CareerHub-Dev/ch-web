import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";

export default function NotificationsModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  return (
    <DialogWithBackdrop show={show} onClose={onClose} title={"Повідомлення"} panelSize="3xl">
      <hr className="my-4 border-t-gray-300" />
      <p className="text-gray-600 italic text-center">{"Повідомлень немає"}</p>
    </DialogWithBackdrop>
  );
}
