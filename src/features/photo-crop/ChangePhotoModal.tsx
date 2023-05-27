import ImageCrop from "@/components/ui/ImageCrop/v2";
import PhotoDragAndDropInput from "@/components/ui/PhotoDragAndDropInput";
import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import useImageCrop from "@/hooks/useImageCrop";
import { LoadedPhotoData } from "@/hooks/useImageUpload";

export default function ChangePhotoModal({
    show,
    onClose,
    onConfirm,
}: {
    show: boolean;
    onClose: () => void;
    onConfirm: (value: LoadedPhotoData) => void;
}) {
    const { temporaryPhoto, load, changeCrop, isLoaded } = useImageCrop();

    const handleConfirm = () => {
        if (!isLoaded) return;

        onConfirm({
            sourceFileName: temporaryPhoto.source.name,
            sourceFileType: temporaryPhoto.source.type,
            croppedImage: temporaryPhoto.cropped,
        });
        onClose();
    };
    return (
        <DialogWithBackdrop
            title={"Змінити фото"}
            onClose={onClose}
            show={show}
        >
            {!isLoaded ? (
                <PhotoDragAndDropInput onPhotoLoaded={load} />
            ) : (
                <ImageCrop
                    src={temporaryPhoto.sourceUrl}
                    onChangeCrop={changeCrop}
                    fileType={temporaryPhoto.source.type}
                />
            )}
            <DialogActionButtons
                onConfirm={handleConfirm}
                onCancel={onClose}
                confirmationDisabled={!isLoaded}
                cancelText={"Відміна"}
                confirmText={"Змінити"}
            />
        </DialogWithBackdrop>
    );
}
