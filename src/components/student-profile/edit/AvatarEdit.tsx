import useImageUpload from '@/hooks/useImageUpload/v2';
import { useBoolean } from 'usehooks-ts';
import { useState, type ChangeEvent } from 'react';
import Overlay from '@/components/ui/Overlay';
import Image from 'next/future/image';
import PencilIcon from '@/components/ui/icons/PencilIcon';
import AvatarCrop from './AvatarCrop';

import cn from 'classnames';

const AvatarEdit = ({ initialData }: { initialData: any }) => {
  const avatarUpload = useImageUpload({ initialData });
  const [completedCropUrl, setCompletedCropUrl] = useState<string>();

  const editPopupIsOpen = useBoolean(false);
  const imageSource = completedCropUrl
    ? completedCropUrl
    : initialData
    ? avatarUpload.url
    : '/default-avatar.png';

  const avatarUploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    avatarUpload.change(file);
    editPopupIsOpen.setFalse();
  };

  const newAvatarCancelHandler = () => {
    avatarUpload.reset();
    setCompletedCropUrl(undefined);
  }

  const newAvatarSaveHandler = () => {
    // TODO: add handler;
  };

  return (
    <>
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
              onChange={avatarUploadHandler}
              className="hidden"
            />
            <button className="block w-full py-2 px-8 cursor-pointer hover:bg-primaryBlue hover:text-white">
              Видалити аватар
            </button>
          </div>
        </Overlay>

        {avatarUpload.isTouched && (
          <>
            <AvatarCrop
              src={avatarUpload.url}
              onCropComplete={setCompletedCropUrl}
              fileType={avatarUpload.fileType as string}
            />
            <div className='flex flex-row-reverse mt-4 mb-40'>
              <button className='btn-primary p-2 w-40 ml-2 bg-primaryBlue' onClick={newAvatarSaveHandler}>Зберегти</button>
              <button className='btn-primary p-2 w-40' onClick={newAvatarCancelHandler}>Скасувати</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default AvatarEdit;
