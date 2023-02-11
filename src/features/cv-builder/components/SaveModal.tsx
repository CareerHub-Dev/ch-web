import { getCvMutationData, useCvDataStore } from '../store/cv-data-store';
import { useCvUiStore } from '../store/cv-ui-store';
import { useCvQueryData } from '@/hooks/useCvQuery';
import { useRouter } from 'next/router';
import useProtectedMutation from '@/hooks/useProtectedMutation';
import useToast from '@/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';
import { createCv } from '@/lib/api/cvs';
import { type ChangeEvent } from 'react';
import { ConfirmCancelDialog } from '@/components/ui/ConfirmCancelDialog';
import ModalLoading from '@/components/ui/Modal/ModalLoading';

export function SaveModal() {
  const cvId = useCvDataStore((s) => s.cvId);
  const closeModal = useCvUiStore((s) => s.closeModal);
  const isOpen = useCvUiStore((s) => s.currentModal) === 'save';
  const title = useCvDataStore((state) => state.cvData.title);
  const changeTitle = useCvDataStore((s) => s.changeTitle);
  const toast = useToast();
  const router = useRouter();
  const cvData = useCvQueryData(cvId);
  const queryClient = useQueryClient();
  const cvMutationData = useCvDataStore(getCvMutationData);

  const titleWasTouched = title.wasBlurred && title.wasChanged;
  const titleValue = titleWasTouched ? title.value : cvData?.title || '';

  const mutationKey = [cvId === null ? 'create-cv' : `modify-cv-${cvId}`];
  // const mutationFn = cvId === null ? createCv : modifyCv(cvId);

  const { mutate, isLoading, isSuccess } = useProtectedMutation(
    mutationKey,
    createCv,
    {
      onSuccess: () => {
        queryClient.refetchQueries(['student-own-cvs']);
        toast.success('Резюме збережено!');
        router.push('/my-cvs').then((pushed) => {
          if (pushed) {
            closeModal();
          }
        });
      },
      onError: () => {
        toast.error('Не вдалося зберегти резюме');
      },
    }
  );

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeTitle(e.target.value);
  };

  const noCvMutationData = cvMutationData === null;

  const handleConfirm = () => {
    if (noCvMutationData) {
      toast.error('Не можна зберегти резюме без обраної позиції');
      return;
    }
    mutate(cvMutationData);
  };

  return (
    <ConfirmCancelDialog
      title="Зберегти резюме"
      show={isOpen}
      onClose={closeModal}
      confirmText="Зберегти"
      cancelText="Не зараз"
      onConfirm={handleConfirm}
      confirmationDisabled={noCvMutationData}
    >
      <ModalLoading show={isLoading || isSuccess} />
      <div className="mt-4 flex flex-col gap-1">
        <label htmlFor="cvTitleInput" className="text-gray-500">
          Назва
        </label>
        <input
          id="cvTitleInput"
          className="px-4 py-2 rounded-md bg-gray-100 outline-none border-2 border-solid focus:border-blue-500 transition-all ease-in-out duration-200"
          type="text"
          placeholder="Дайте цьому резюме назву"
          value={titleValue}
          onChange={handleTitleChange}
        />
      </div>
    </ConfirmCancelDialog>
  );
}
