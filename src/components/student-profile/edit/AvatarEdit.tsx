import useImageUpload from '@/hooks/useImageUpload/v2';
import useToast from '@/hooks/useToast';
import useAuth from '@/hooks/useAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStudentPhoto } from '@/lib/api/student';
import { useBoolean } from 'usehooks-ts';
import { useState, useCallback, type ChangeEvent } from 'react';
import Overlay from '@/components/ui/Overlay';
import Image from 'next/future/image';
import PencilIcon from '@/components/ui/icons/PencilIcon';
import AvatarCrop from './AvatarCrop';
import ModalLoading from '@/components/ui/Modal/ModalLoading';

import cn from 'classnames';

const AvatarEdit = ({ initialData }: { initialData: any }) => {
  const auth = useAuth();
  const toast = useToast();
  const queryClient = useQueryClient();
  const avatarUpload = useImageUpload({ initialData });
  const [completedCrop, setCompletedCrop] = useState<{
    url?: string;
    blob?: Blob;
  }>({});

  const editPopupIsOpen = useBoolean(false);
  const imageSource = completedCrop.url
    ? completedCrop.url
    : initialData ?? '/default-avatar.png';

  const updateStudentPhotoMutation = useMutation(
    ['updateSelfStudentPhoto'],
    updateStudentPhoto,
    {
      onSuccess: (data) => {
        const currentData = queryClient.getQueryData(['selfStudent']);
        if (typeof currentData === 'object' && typeof data === 'string') {
          queryClient.setQueryData(['selfStudent'], {
            ...currentData,
            photoId: data,
          });
        } else {
          queryClient.invalidateQueries(['selfStudent']);
        }
        toast.success('Фото успішно оновлено');
        avatarUpload.reset();
        setCompletedCrop({});
      },
      onError: (error) => {
        let msg = 'Не вдалося оновити фото, невідома помилка';
        if (error instanceof Error) {
          msg = error.message;
        } else if (typeof error === 'string') {
          msg = error;
        }
        toast.error(msg);
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
    setCompletedCrop({});
  };

  const saveNewAvatar = useCallback(async () => {
    if (completedCrop.blob) {
      await updateStudentPhotoMutation.mutateAsync({
        accessToken: auth.session?.jwtToken,
        blob: completedCrop.blob,
      });
    }
  }, [auth.session?.jwtToken, completedCrop.blob, updateStudentPhotoMutation]);

  const deleteAvatar = async () => {
    await updateStudentPhotoMutation.mutateAsync({
      accessToken: auth.session?.jwtToken,
    });
  };

  return (
    <>
      {updateStudentPhotoMutation.isLoading && <ModalLoading />}
      <h2 className="text-2xl">Аватар</h2>
      <p className="text-sm text-darkGray mb-2">
        Завантаження фото для аватару
      </p>
      <hr />
      <div className="mt-4 p-4">
        <Image
          src={imageSource}
          width={256}
          height={256}
          alt={'Твій аватар'}
          className="block mx-auto border-2 border-primaryGray"
        />

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
            <AvatarCrop
              src={avatarUpload.url}
              onCropComplete={setCompletedCrop}
              fileType={avatarUpload.fileType as string}
            />
            <div className="flex flex-row-reverse mt-4 mb-40">
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
