import { ConfirmCancelDialog } from '@/components/ui/ConfirmCancelDialog';
import { useCvAssistanceStore } from '@/context/cv-assistance-store';
import { getPhotoDetails, useCvDataStore } from '@/context/cv-data-store';
import { getImage } from '@/lib/api/image';
import Image from 'next/image';
import { useBoolean } from 'usehooks-ts';
import AssistanceAlert from '../AssistantAlert';
import ChangeOrRemovePhotoButton from '../ChangeOrRemovePhotoButton';
import PhotoEditDialog from '../PhotoEditDialog';

export default function Stage2() {
  const changePhotoModalIsOpen = useBoolean(false);
  const removePhotoModalIsOpen = useBoolean(false);
  const isAssistEnabled = useCvAssistanceStore((s) => s.isAssistanceEnabled);
  const photoDetails = useCvDataStore(getPhotoDetails);
  const removePhoto = useCvDataStore((s) => s.removePhoto);

  const handlePhotoRemovalConfirmation = () => {
    removePhoto();
    removePhotoModalIsOpen.setFalse();
  };

  return (
    <>
      {changePhotoModalIsOpen.value && (
        <PhotoEditDialog onClose={changePhotoModalIsOpen.setFalse} />
      )}
      <ConfirmCancelDialog
        onConfirm={handlePhotoRemovalConfirmation}
        onClose={removePhotoModalIsOpen.setFalse}
        title={'Видалити фото?'}
        cancelText={'Ні'}
        confirmText={'Так'}
        show={removePhotoModalIsOpen.value}
        confirmClasses="bg-red-600 text-white focus:ring-red-500"
      />

      <div className="space-y-6 sm:space-y-5">
        <h3 className="text-xl font-medium leading-6 text-gray-900">
          {'Фотографія'}
        </h3>

        <div className="sm:grid sm:grid-cols-2 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-700"
          >
            Фото
          </label>
          <div className="mt-1 sm:mt-0">
            <div className="flex items-center flex-row-reverse">
              <ChangeOrRemovePhotoButton
                onChangeClick={changePhotoModalIsOpen.setTrue}
                onRemoveClick={removePhotoModalIsOpen.setTrue}
              />

              <span className="h-48 w-48 overflow-hidden rounded-full bg-gray-100 mr-5">
                {photoDetails === null ? (
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : photoDetails.type === 'imagePath' ? (
                  <Image
                    src={getImage(photoDetails.path)}
                    alt="Ваше фото"
                    width={200}
                    height={200}
                    className="h-full w-full"
                  />
                ) : (
                  <Image
                    src={photoDetails.croppedPhotoUrl}
                    alt="Ваше фото"
                    width={200}
                    height={200}
                    className="h-full w-full"
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isAssistEnabled && (
        <div className="mt-6">
          <AssistanceAlert title="Чим може стати у нагоді фотографія в резюме?">
            <ul>
              <li>Деякі вакансії вимагають фотографію у резюме;</li>
              <li>
                Для деяких компаній важливо, щоб працівник виглядав
                презентабельно;
              </li>
              <li>{`Рекрутерам буде легше вас запам'ятати;`}</li>
            </ul>
            <br />
            <p>
              {`Якщо вирішив додавати фотографію, то переконайся, що вона виглядає доречною і що ти на ній схожий на самого себе`}
            </p>
          </AssistanceAlert>
        </div>
      )}
    </>
  );
}
