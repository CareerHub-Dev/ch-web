import { useImageUpload } from "@/hooks/useImageUpload";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import useToast from "@/hooks/useToast";
import { updateJobOfferImage } from "@/lib/api/job-offer";
import parseUnknownError from "@/lib/parse-unknown-error";
import { useQueryClient } from "@tanstack/react-query";
import { FormEventHandler } from "react";
import ChangePhotoModal from "../photo-crop/ChangePhotoModal";
import RemovePhotoModal from "../photo-crop/RemovePhotoModal";
import { useBoolean } from "usehooks-ts";
import SecondaryButton from "@/components/ui/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { getJobOfferLogo } from "@/lib/api/image";
import Image from "next/image";

export default function EditJobOfferImageForm({
  initialImageId,
  jobOfferId,
}: {
  initialImageId: string | null | undefined;
  jobOfferId: string;
}) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const photo = useImageUpload();
  const cropDialogIsOpen = useBoolean(false);
  const deleteDialogIsOpen = useBoolean(false);
  const submitMutation = useProtectedMutation(
    ["update-job-offer-image"],
    updateJobOfferImage,
    {
      onMutate: () => {
        toast.setCurrent("Оновлюємо зображення...");
      },
      onError: (err) => {
        toast.error(parseUnknownError(err), true);
      },
      onSuccess: () => {
        toast.success(`Зображення оновлено`, true);
        queryClient.invalidateQueries(["job-offer", jobOfferId]);
        photo.reset();
      },
    }
  );

  const cannotSubmit = submitMutation.isLoading || photo.data === undefined;
  const imageSource =
    photo.data?.croppedPhotoUrl ?? getJobOfferLogo(initialImageId, null);

  const handleRemove = () => {
    submitMutation.mutate({
      jobOfferId,
      image: null,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!photo.data) {
      return;
    }
    submitMutation.mutate({
      jobOfferId,
      image: new File([photo.data.croppedPhoto], photo.data.sourceFileName, {
        type: photo.data.sourceFileType,
      }),
    });
  };

  return (
    <div className="p-8 mb-4">
      <ChangePhotoModal
        show={cropDialogIsOpen.value}
        onClose={cropDialogIsOpen.setFalse}
        onConfirm={photo.load}
      />
      <RemovePhotoModal
        isLoading={submitMutation.isLoading}
        show={deleteDialogIsOpen.value}
        onClose={deleteDialogIsOpen.setFalse}
        onConfirm={handleRemove}
      />
      <h2 className="text-base font-semibold leading-7 text-black">
        {"Зображення"}
      </h2>

      <form className="md:col-span-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full flex items-center gap-x-8">
            <Image
              src={imageSource}
              alt="job-offier"
              width={96}
              height={96}
              className="h-24 w-24 flex-none rounded-md bg-gray-800 object-cover"
            />
            <SecondaryButton
              type="button"
              onClick={cropDialogIsOpen.setTrue}
              disabled={submitMutation.isLoading}
            >
              {"Змінити"}
            </SecondaryButton>
            <SecondaryButton
              type="button"
              onClick={deleteDialogIsOpen.setTrue}
              disabled={submitMutation.isLoading}
            >
              {"Видалити"}
            </SecondaryButton>
          </div>

          <div className="mt-8 flex gap-4">
            <PrimaryButton type="submit" className="flex items-center gap-1" disabled={cannotSubmit}>
              {submitMutation.isLoading ? (
                <LoadingSpinner className="text-white h-4 w-4" />
              ) : null}
              {"Зберегти"}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
}
