import useProtectedMutation from "@/hooks/useProtectedMutation";
import useToast from "@/hooks/useToast";
import parseUnknownError from "@/lib/parse-unknown-error";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SecondaryButton from "@/components/ui/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { updateCompanyLogo } from "@/lib/api/company";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useBoolean } from "usehooks-ts";
import Image from "next/image";
import { getImageWithDefault } from "@/lib/api/image";
import ChangePhotoModal from "@/features/photo-crop/ChangePhotoModal";
import RemovePhotoModal from "@/features/photo-crop/RemovePhotoModal";
import { useQueryClient } from "@tanstack/react-query";

export default function LogoEditForm({
  logo,
}: {
  logo: string | null | undefined;
}) {
  const toast = useToast();
  const client = useQueryClient();
  const imageUpload = useImageUpload();
  const cropDialogIsOpen = useBoolean(false);
  const deleteDialogIsOpen = useBoolean(false);
  const { mutate, isLoading } = useProtectedMutation(
    ["update-photo"],
    updateCompanyLogo,
    {
      onSuccess: () => {
        client.invalidateQueries(["self-avatar"]);
        toast.success("Зміни збережено");
      },
      onError: (error) => {
        toast.error(parseUnknownError(error));
      },
    }
  );
  const cannotSubmit = isLoading || imageUpload.data === undefined;
  const imageSource =
    imageUpload.data?.croppedPhotoUrl ?? getImageWithDefault(logo, "Company");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageUpload.data === undefined) {
      return;
    }
    const { data } = imageUpload;
    mutate(
      new File([data.croppedPhoto], data.sourceFileName, {
        type: data.sourceFileType,
      })
    );
  };

  const handleRemove = () => {
    mutate(undefined);
  };

  return (
    <>
      <ChangePhotoModal
        show={cropDialogIsOpen.value}
        onClose={cropDialogIsOpen.setFalse}
        onConfirm={imageUpload.load}
      />
      <RemovePhotoModal
        isLoading={isLoading}
        show={deleteDialogIsOpen.value}
        onClose={deleteDialogIsOpen.setFalse}
        onConfirm={handleRemove}
      />
      <div>
        <h2 className="text-base font-semibold leading-7 text-black">
          {"Логотип компанії"}
        </h2>

        <p className="mt-1 text-sm leading-6 text-gray-400">
          {
            "Завантажте логотип компанії. Логотип буде відображатися на сторінці компанії та в пошуку вакансій."
          }
        </p>
      </div>

      <form className="md:col-span-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full flex items-center gap-x-8">
            <Image
              src={imageSource}
              alt="Company"
              width={96}
              height={96}
              className="h-24 w-24 flex-none rounded-md bg-gray-800 object-cover"
            />
            <SecondaryButton
              type="button"
              onClick={cropDialogIsOpen.setTrue}
              disabled={isLoading}
            >
              {"Змінити логотип"}
            </SecondaryButton>
          </div>

          <div className="mt-8 flex gap-4">
            <PrimaryButton type="submit" disabled={cannotSubmit}>
              {isLoading ? (
                <LoadingSpinner className="text-white h-5 w-5" />
              ) : (
                "Зберегти"
              )}
            </PrimaryButton>
            <PrimaryButton
              type="button"
              variant="red"
              onClick={deleteDialogIsOpen.setTrue}
              disabled={isLoading}
            >
              {"Видалити"}
            </PrimaryButton>
          </div>
        </div>
      </form>
    </>
  );
}
