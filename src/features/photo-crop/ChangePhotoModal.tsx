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
  const { temporaryPhoto, load, changeCrop, isLoaded, reset } = useImageCrop();

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
    <DialogWithBackdrop title={"Змінити фото"} onClose={onClose} show={show}>
      {!isLoaded ? (
        <PhotoDragAndDropInput onPhotoLoaded={load} />
      ) : (
        <>
          <ImageCrop
            src={temporaryPhoto.sourceUrl}
            onChangeCrop={changeCrop}
            fileType={temporaryPhoto.source.type}
          />
          <button
            onClick={reset}
            className="block text-center mx-auto bg-transparent px-2 py-1.5 text-sm text-blue-600 hover:underline hover:underline-offset-2"
          >
            {"Прибрати поточне фото"}
          </button>
        </>
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
