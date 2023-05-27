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
import { getCompanyBanner } from "@/lib/api/image";
import RemovePhotoModal from "@/features/photo-crop/RemovePhotoModal";

export default function BannerEditForm({
    banner,
}: {
    banner: string | null | undefined;
}) {
    const toast = useToast();
    const imageUpload = useImageUpload();
    const deleteDialogIsOpen = useBoolean(false);
    const { mutate, isLoading } = useProtectedMutation(
        ["update-banner"],
        updateCompanyLogo,
        {
            onSuccess: () => {
                toast.success("Зміни збережено");
            },
            onError: (error) => {
                toast.error(parseUnknownError(error));
            },
        }
    );
    const cannotSubmit = isLoading || imageUpload.data === undefined;
    const imageSource =
        imageUpload.data?.croppedPhotoUrl ?? getCompanyBanner(banner);

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
    const handleCancelClick = () => {};
    const handleRemove = () => {
        mutate(undefined);
    };

    return (
        <>
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

            <form className="md:col-span-2" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="col-span-full flex items-center gap-x-8">
                        <Image
                            src={imageSource}
                            alt="Company"
                            width={1024}
                            height={128}
                            className="h-[128px] w-[1024px] flex-none rounded-md bg-gray-800 object-cover"
                        />
                        <SecondaryButton
                            type="button"
                            onClick={deleteDialogIsOpen.setTrue}
                            disabled={isLoading}
                        >
                            {"Видалити"}
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

                        <SecondaryButton
                            type="button"
                            onClick={handleCancelClick}
                        >
                            {"Відмінити"}
                        </SecondaryButton>
                    </div>
                </div>
            </form>
        </>
    );
}