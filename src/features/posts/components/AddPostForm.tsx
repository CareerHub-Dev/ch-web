import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import { useAddPostMutation } from "../hooks/use-add-post-mutation";
import { useInput } from "@/hooks/useInput";
import { useMultipleImagesUpload } from "@/hooks/useMultipleImagesUpload";
import { fillThisFieldValidator } from "@/lib/util";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ValidatedTextArea from "@/components/ui/ValidatedTextArea";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import MultipleImagesInput from "@/components/ui/MultipleImagesInput";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/20/solid";

const validators = [fillThisFieldValidator("Це поле є обов'язковим")];

export default function AddPostForm({
  onSuccess,
  onClose,
  show,
}: {
  onSuccess?: () => void;
  onClose: () => void;
  show: boolean;
}) {
  const { mutateAsync, isLoading } = useAddPostMutation();
  const textInput = useInput({
    validators,
    initialValue: "",
  });
  const imagesInput = useMultipleImagesUpload();

  const dialogTitle = "Додати публікацію";
  const confirmText = "Додати";
  const cannotSave = isLoading || !textInput.isValid;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await mutateAsync({
      text: textInput.value,
      images: [],
    });
    textInput.reset();
    imagesInput.reset();
    if (onSuccess !== undefined) {
      onSuccess();
    }
    onClose();
  };

  return (
    <DialogWithBackdrop
      show={show}
      onClose={onClose}
      panelSize="xl"
      title={dialogTitle}
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="text" id="text-label" className="font-normal text-base">
          {"Текст"}
        </label>
        <ValidatedTextArea
          id="text"
          value={textInput.value}
          onChange={textInput.change}
          wasBlurred={textInput.wasBlurred}
          wasChanged={textInput.wasChanged}
          errors={textInput.errors}
          warnings={textInput.warnings}
          onBlur={textInput.blur}
        />

        <hr className="my-8 border-t-gray-300" />
        <h2 className="font-normal text-base">{"Зображення"}</h2>

        <MultipleImagesInput onPhotoLoaded={imagesInput.add} />
        <ul
          id="images-list"
          role="list"
          className="mt-4 flex flex-col overflow-y-auto max-h-96 w-full divide-y divide-gray-200"
        >
          {imagesInput.data.map((image, imageIdx) => (
            <div key={imageIdx} className="relative block">
              <Image
                width={256}
                height={256}
                src={image.url}
                className="max-h-24 h-24 w-auto mx-auto my-2"
                alt={`attached-${imageIdx}`}
              />

              <div className="absolute top-0 right-0 block pr-4 translate-y-[50%]">
                <button
                  type="button"
                  className="rounded-full bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => imagesInput.remove(imageIdx)}
                >
                  <span className="sr-only">{"Видалити"}</span>
                  <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </ul>
        <div className="flex justify-end mt-8 border-t-gray-300">
          <PrimaryButton type="submit" disabled={cannotSave}>
            {isLoading ? (
              <LoadingSpinner className="inline-block mr-2 text-blue-500" />
            ) : null}
            {confirmText}
          </PrimaryButton>
        </div>
      </form>
    </DialogWithBackdrop>
  );
}
