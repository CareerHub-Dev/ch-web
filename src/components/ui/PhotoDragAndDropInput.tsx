import useToast from "@/hooks/useToast";
import { croppedImageFromFileAndCrop, isImageTypeValid } from "@/lib/images";
import cn from "classnames";
import { ChangeEvent, type DragEvent } from "react";
import { PercentCrop } from "react-image-crop";
import { useBoolean } from "usehooks-ts";

export default function PhotoDragAndDropInput({
  onPhotoLoaded,
}: {
  onPhotoLoaded: (options: {
    photoSource: File;
    croppedPhotoBlob: Blob;
  }) => void;
}) {
  const toast = useToast();
  const dragAndDropAreaFocused = useBoolean(false);

  const handleDragOver = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragAndDropAreaFocused.setTrue();
  };

  const handleDragLeave = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragAndDropAreaFocused.setFalse();
  };

  const validateImageFile = async (file: File | undefined) => {
    if (!file) {
      toast.error("Помилка при обробці файлу");
      return;
    }

    if (!isImageTypeValid(file)) {
      toast.error("Формат файлу не підтримується");
      return;
    }

    const croppedPhoto = await croppedImageFromFileAndCrop({
      file,
      crop: DEFAULT_PHOTO_CROP,
    });

    onPhotoLoaded({
      photoSource: file,
      croppedPhotoBlob: croppedPhoto,
    });
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dragAndDropAreaFocused.setFalse();

    const file = event.dataTransfer.files[0];
    validateImageFile(file);
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const file = event.target.files?.[0];
    validateImageFile(file);
  };

  return (
    <div className="sm:pt-5">
      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex max-w-full justify-center rounded-md border-2 border-dashed px-6 pt-5 pb-6",
            dragAndDropAreaFocused.value ? "border-blue-500" : "border-gray-300"
          )}
        >
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
              >
                <span>Оберіть файл</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleFileInputChange}
                />
              </label>
              <p className="pl-1">або перетягніть сюди</p>
            </div>
            <p className="text-xs text-gray-500">PNG або JPG не більше 2МБ</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const DEFAULT_PHOTO_CROP: PercentCrop = {
  unit: "%",
  x: 25,
  y: 25,
  width: 50,
  height: 50,
};
