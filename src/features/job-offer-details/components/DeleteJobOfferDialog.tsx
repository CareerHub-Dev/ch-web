import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import { useDeleteJobOfferMutation } from "../hooks/use-job-offer-details-query";
import { useRouter } from "next/router";
import useToast from "@/hooks/useToast";
import parseUnknownError from "@/lib/parse-unknown-error";
import { useQueryClient } from "@tanstack/react-query";

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
  const router = useRouter();
  const toast = useToast();
  const client = useQueryClient();
  const mut = useDeleteJobOfferMutation();

  const handleConfirm = () => {
    toast.setCurrent("Видалення вакансії...");
    mut.mutate(jobOfferid, {
      onSuccess: () => {
        toast.success("Вакансію успішно видалено", true);
        client.invalidateQueries(["job-offers-feed"]);
        router.replace("/my-job-offers");
        onClose();
      },
      onError: (err) => {
        toast.error(parseUnknownError(err), true);
      },
    });
  };

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
        isLoading={mut.isLoading}
        onConfirm={handleConfirm}
        confirmText={"Видалити"}
        confirmColor="red"
        onCancel={onClose}
        cancelText={"Скасувати"}
      />
    </DialogWithBackdrop>
  );
}
