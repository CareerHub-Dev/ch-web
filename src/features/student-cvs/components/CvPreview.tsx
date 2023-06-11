import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";
import { useCvDetailsQuery } from "../hooks/use-cv-details-query";

export default function CvPreview({
  show,
  onClose,
  cvId,
}: {
  show: boolean;
  onClose: () => void;
  cvId: string;
}) {
  const { data, isLoading, isError, error } = useCvDetailsQuery(cvId);
  const dialogTitle = isLoading
    ? "Завантажуємо"
    : isError
    ? "Помилка"
    : data.title;

  return (
    <DialogWithBackdrop
      show={show}
      onClose={onClose}
      title={dialogTitle}
      panelSize="3xl"
    >
      {isLoading ? (
        <CenteredLoadingSpinner />
      ) : isError ? (
        <p className="text-center text-red-600">{parseUnknownError(error)}</p>
      ) : (
        <h1>DATA</h1>
      )}
    </DialogWithBackdrop>
  );
}
