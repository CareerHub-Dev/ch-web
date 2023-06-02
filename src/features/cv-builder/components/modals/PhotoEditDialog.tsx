import { useCvDataStore } from "../../store/cv-data-store";
import ImageCrop from "@/components/ui/ImageCrop/v2";
import PhotoDragAndDropInput from "@/components/ui/PhotoDragAndDropInput";
import useImageCrop from "@/hooks/useImageCrop";
import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";

export default function PhotoEditDialog({
  onClose,
  show,
}: {
  onClose: () => void;
  show: boolean;
}) {
  const { temporaryPhoto, load, changeCrop, isLoaded } = useImageCrop();
  const changePhoto = useCvDataStore((s) => s.changePhoto);

  const handleSaveClick = () => {
    if (!isLoaded) return;

    changePhoto({
      sourceFileName: temporaryPhoto.source.name,
      sourceFileType: temporaryPhoto.source.type,
      croppedImage: temporaryPhoto.cropped,
    });
    onClose();
  };

  return (
    <DialogWithBackdrop title={"Змінити фото"} onClose={onClose} show={show}>
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
        onConfirm={handleSaveClick}
        onCancel={onClose}
        confirmationDisabled={!isLoaded}
        cancelText={"Відміна"}
        confirmText={"Змінити"}
      />
    </DialogWithBackdrop>
  );
}
