import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";

export default function DeleteJobOfferDialog({
  show,
  onClose,
  jobOfferid,
  title,
}: {
  show: boolean;
  onClose: () => void;
  jobOfferid: string;
  title: string;
}) {
  return (
    <DialogWithBackdrop
      show={show}
      onClose={onClose}
      title={"Видалити вакансію"}
    >
      <div className="text-sm text-gray-500">
        {"Ви впевнені, що хочете видалити вакансію "}
        <span className="font-semibold">{title}</span>
        {"?"}
      </div>
      <DialogActionButtons
        onConfirm={() => {
          console.log("Delete job offer with id: ", jobOfferid);
          onClose();
        }}
        confirmText={"Видалити"}
        confirmColor="red"
        onCancel={onClose}
        cancelText={"Скасувати"}
      />
    </DialogWithBackdrop>
  );
}
