import useProtectedMutation from "@/hooks/useProtectedMutation";
import useToast from "@/hooks/useToast";
import parseUnknownError from "@/lib/parse-unknown-error";
import SecondaryButton from "@/components/ui/SecondaryButton";
import { updateCompanyBanner } from "@/lib/api/company";
import { useBoolean } from "usehooks-ts";
import Image from "next/image";
import { getCompanyBanner } from "@/lib/api/image";
import RemovePhotoModal from "@/features/photo-crop/RemovePhotoModal";
import { useSingleImageUpload } from "@/hooks/useMultipleImagesUpload";
import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import SingleImageInput from "@/components/ui/SingleImageInput";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useQueryClient } from "@tanstack/react-query";

export default function BannerEditForm({
  banner,
}: {
  banner: string | null | undefined;
}) {
  const deleteDialogIsOpen = useBoolean(false);
  const changeDialogIsOpen = useBoolean(false);
  const imageSource = getCompanyBanner(banner);
  const { mutate, isLoading } = useUpdateBannerMutation();
  const handleRemove = () => {
    mutate(undefined);
  };

  return (
    <>
      <ChangeBannerModal
        show={changeDialogIsOpen.value}
        onClose={changeDialogIsOpen.setFalse}
      />
      <RemovePhotoModal
        isLoading={isLoading}
        show={deleteDialogIsOpen.value}
        onClose={deleteDialogIsOpen.setFalse}
        onConfirm={handleRemove}
      />
      <div>
        <h2 className="text-base font-semibold leading-7 text-black">
          {"Баннер компанії"}
        </h2>

        <p className="mt-1 text-sm leading-6 text-gray-400">
          {
            "Завантажте баннер компанії. Баннер буде відображатися на сторінці компанії."
          }
        </p>
      </div>

      <div className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full flex items-center gap-x-8">
            <Image
              src={imageSource}
              alt="Company"
              width={1024}
              height={128}
              className="h-[128px] w-[1024px] flex-none rounded-md bg-gray-800 object-cover"
            />
            <div className="flex flex-col gap-4">
              <SecondaryButton
                type="button"
                onClick={changeDialogIsOpen.setTrue}
                disabled={isLoading}
              >
                {"Змінити"}
              </SecondaryButton>
              <SecondaryButton
                type="button"
                onClick={deleteDialogIsOpen.setTrue}
                disabled={isLoading}
              >
                {"Видалити"}
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function useUpdateBannerMutation() {
  const toast = useToast();
  const client = useQueryClient();
  return useProtectedMutation(["update-banner"], updateCompanyBanner, {
    onSuccess: () => {
      client.invalidateQueries(["self-company"]);
      toast.success("Зміни збережено");
    },
    onError: (error) => {
      toast.error(parseUnknownError(error));
    },
  });
}

function ChangeBannerModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const photoUpload = useSingleImageUpload();
  const { mutate, isLoading } = useUpdateBannerMutation();
  const handleConfirm = () => {
    if (photoUpload.data === undefined) {
      return;
    }
    mutate(photoUpload.data.file, {
      onSuccess: () => {
        photoUpload.reset();
        onClose();
      },
    });
  };
  return (
    <DialogWithBackdrop title={"Змінити баннер"} onClose={onClose} show={show}>
      {photoUpload.data === undefined ? (
        <SingleImageInput onPhotoLoaded={photoUpload.change} />
      ) : (
        <div className="relative block">
          <Image
            src={photoUpload.data?.url}
            width={1024}
            height={128}
            className="h-[128px] w-[1024px] flex-none rounded-md bg-gray-800 object-cover"
            alt={`new-banner`}
          />

          <div className="absolute top-0 right-0 block pr-4 translate-y-[50%]">
            <button
              type="button"
              className="rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={photoUpload.reset}
            >
              <span className="sr-only">{"Видалити"}</span>
              <XCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
      <DialogActionButtons
        onConfirm={handleConfirm}
        onCancel={onClose}
        isLoading={isLoading}
        confirmationDisabled={photoUpload.data === undefined}
        cancelText={"Відміна"}
        confirmText={"Змінити"}
      />
    </DialogWithBackdrop>
  );
}
