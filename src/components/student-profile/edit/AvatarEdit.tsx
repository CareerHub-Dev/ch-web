import { PencilIcon } from '@heroicons/react/24/outline';
import ImageCrop from '@/components/ui/ImageCrop';
import ModalLoading from '@/components/ui/Modal/ModalLoading';
import Overlay from '@/components/ui/Overlay';
import useImageUpload from '@/hooks/useImageUpload/v2';
import useProtectedMutation from '@/hooks/useProtectedMutation';
import useToast from '@/hooks/useToast';
import { updateStudentPhoto } from '@/lib/api/student';
import parseUnknownError from '@/lib/parse-unknown-error';
import { useQueryClient } from '@tanstack/react-query';
import Image, { type StaticImageData } from 'next/image';
import { useCallback, useState, type ChangeEvent } from 'react';
import { useBoolean } from 'usehooks-ts';

import cn from 'classnames';

const AvatarEdit = ({
  initialData,
}: {
  initialData: string | StaticImageData;
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const avatarUpload = useImageUpload({ initialData });
  const [completedCrop, setCompletedCrop] = useState<{
    url: string;
    blob: Blob;
  }>();

  const editPopupIsOpen = useBoolean(false);
  const imageSource = completedCrop?.url ?? initialData;

  const updateStudentPhotoMutation = useProtectedMutation(
    ['updateSelfStudentPhoto'],
    updateStudentPhoto,
    {
      onSuccess: (data) => {
        const currentData = queryClient.getQueryData(['selfStudent']);
        if (typeof currentData === 'object' && typeof data === 'string') {
          queryClient.setQueryData(['selfStudent'], {
            ...currentData,
            photo: data,
          });
        } else {
          queryClient.invalidateQueries(['selfStudent']);
        }
        toast.success('Фото успішно оновлено');
        avatarUpload.reset();
        setCompletedCrop(undefined);
      },
      onError: (error) => {
        toast.error(parseUnknownError(error));
      },
    }
  );

  const uploadAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    avatarUpload.change(file);
    editPopupIsOpen.setFalse();
  };

  const cancelNewAvatar = () => {
    avatarUpload.reset();
    setCompletedCrop(undefined);
  };

  const saveNewAvatar = useCallback(() => {
    if (!!completedCrop) {
      updateStudentPhotoMutation.mutate(
        new File([completedCrop.blob], `file.${avatarUpload.fileExtension}`, {
          type: avatarUpload.fileType ?? undefined,
        })
      );
    }
  }, [
    avatarUpload.fileExtension,
    avatarUpload.fileType,
    completedCrop,
    updateStudentPhotoMutation,
  ]);

  const deleteAvatar = () => {
    updateStudentPhotoMutation.mutate(undefined);
  };

  return (
    <>
      <ModalLoading show={updateStudentPhotoMutation.isLoading} />
      <h2 className="text-2xl">Аватар</h2>
      <p className="text-sm text-darkGray mb-2">
        Завантаження фото для аватару
      </p>
      <hr />
      <div className="mt-4 p-4">
        <span className="block mx-auto border-2 border-primaryGray bg-primaryGray w-64 h-64">
          <Image
            src={imageSource}
            width={256}
            height={256}
            alt={'Твій аватар'}
            className="overflow-hidden aspect-square"
          />
        </span>

        <Overlay className="relative" onOutsideClick={editPopupIsOpen.setFalse}>
          <button
            className="btn-flat p-2 m-2 w-[256px] mx-auto tracking-wider border border-primaryGray flex gap-2 items-center justify-center"
            onClick={editPopupIsOpen.toggle}
          >
            <PencilIcon />
            Редагувати
          </button>
          <div
            className={cn(
              'absolute block left-0 right-0 bg-white rounded-xl border border-primaryGray py-2 top-full mt-4 shadow-md mx-auto w-fit z-50',
              !editPopupIsOpen.value && 'hidden'
            )}
          >
            <label
              htmlFor="avatarUpload"
              className="block w-full py-2 px-8 cursor-pointer hover:bg-primaryBlue hover:text-white"
            >
              Завантажити файл
            </label>
            <input
              id="avatarUpload"
              type="file"
              accept="image/png, image/jpeg"
              multiple={false}
              onChange={uploadAvatar}
              className="hidden"
            />
            <button
              className="block w-full py-2 px-8 cursor-pointer hover:bg-primaryBlue hover:text-white"
              onClick={deleteAvatar}
            >
              Видалити аватар
            </button>
          </div>
        </Overlay>

        {avatarUpload.isTouched && (
          <>
            <ImageCrop
              src={avatarUpload.url}
              onCropComplete={setCompletedCrop}
              fileType={avatarUpload.fileType as string}
            />
            <div className="flex flex-row-reverse mt-4 mb-4">
              <button
                className="btn-primary p-2 w-40 ml-2 bg-primaryBlue"
                onClick={saveNewAvatar}
              >
                Зберегти
              </button>
              <button
                className="btn-primary p-2 w-40"
                onClick={cancelNewAvatar}
              >
                Скасувати
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default AvatarEdit;
