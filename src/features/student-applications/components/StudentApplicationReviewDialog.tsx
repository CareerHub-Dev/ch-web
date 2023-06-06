import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import { useApplicationReviewQuery } from "../hooks/use-application-review-query";
import CenteredLoadingSpinner from "@/components/ui/CenteredLoadingSpinner";
import parseUnknownError from "@/lib/parse-unknown-error";
import ReviewApplicationDetails from "./ReviewApplicationDetails";

export default function StudentApplicationReviewDialog({
  applicationId,
  onClose,
  show,
}: {
  applicationId: string | null;
  onClose: () => void;
  show: boolean;
}) {
  const { data, isLoading, isError, error } = useApplicationReviewQuery(
    applicationId ?? ""
  );

  return (
    <DialogWithBackdrop show={show} onClose={onClose} panelSize="3xl">
      {isLoading ? (
        <CenteredLoadingSpinner />
      ) : isError ? (
        <p className="text-center text-red-600">{parseUnknownError(error)}</p>
      ) : (
        <ReviewApplicationDetails {...data} />
      )}
    </DialogWithBackdrop>
  );
}
