import { useCvDataStore } from '@/context/cv-data-store';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';
import ImageCrop from '@/components/ui/ImageCrop/v2';
import PhotoDragAndDropInput from './PhotoDragAndDropInput';

export default function PhotoEditDialog(props: { onClose: () => void }) {
  const changePhoto = useCvDataStore((s) => s.changePhoto);
  const [temporaryPhoto, setTemporaryPhoto] = useState<{
    source: File;
    sourceUrl: string;
    cropped: Blob;
  }>();

  const cannotSave = !temporaryPhoto;

  const handlePhotoLoaded = ({
    photoSource,
    croppedPhotoBlob,
  }: {
    photoSource: File;
    croppedPhotoBlob: Blob;
  }) => {
    if (temporaryPhoto?.sourceUrl)
      URL.revokeObjectURL(temporaryPhoto.sourceUrl);

    setTemporaryPhoto({
      source: photoSource,
      sourceUrl: URL.createObjectURL(photoSource),
      cropped: croppedPhotoBlob,
    });
  };

  const handleChageCrop = (val: Blob) => {
    setTemporaryPhoto((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cropped: val,
      };
    });
  };

  const handleSaveClick = () => {
    if (cannotSave) return;

    changePhoto({
      sourceFileName: temporaryPhoto.source.name,
      sourceFileType: temporaryPhoto.source.type,
      croppedImage: temporaryPhoto.cropped,
    });
    props.onClose();
  };

  return (
    <Transition appear show as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={props.onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative   transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Ваше фото
                  </Dialog.Title>
                  <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={props.onClose}
                    >
                      <span className="sr-only">Закрити</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  {cannotSave ? (
                    <PhotoDragAndDropInput onPhotoLoaded={handlePhotoLoaded} />
                  ) : (
                    <ImageCrop
                      src={temporaryPhoto.sourceUrl}
                      onChangeCrop={handleChageCrop}
                      fileType={temporaryPhoto.source.type}
                    />
                  )}
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={handleSaveClick}
                    disabled={cannotSave}
                  >
                    Зберегти
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={props.onClose}
                  >
                    Відміна
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
