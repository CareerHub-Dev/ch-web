import { useCvDataStore } from '@/context/cv-data-store';
import { useCvUiStore } from '@/context/cv-ui-store';
import { useCvQueryData } from '@/hooks/useCvQuery';
import { ConfirmCancelDialog } from '../ui/ConfirmCancelDialog';

export default function SaveModal() {
  const cvId = useCvDataStore((s) => s.cvId);
  const closeModal = useCvUiStore((s) => s.closeModal);
  const isOpen = useCvUiStore((s) => s.currentModal) === 'save';
  const title = useCvDataStore((state) => state.cvData.title);
  const changeTitle = useCvDataStore((s) => s.changeTitle);

  const cvData = useCvQueryData(cvId);
  const titleValue = title.isTouched ? title.value : cvData?.title || '';

  return (
    <ConfirmCancelDialog
      title="Зберегти резюме"
      show={isOpen}
      onClose={closeModal}
      confirmText="Зберегти"
      cancelText="Не зараз"
      onConfirm={closeModal}
    >
      <div className="mt-4 flex flex-col gap-1">
        <label htmlFor="cvTitleInput" className="text-gray-500">
          Назва
        </label>
        <input
          id="cvTitleInput"
          className="px-4 py-2 rounded-md bg-gray-100 outline-none border-2 border-solid focus:border-indigo-500 transition-all ease-in-out duration-200"
          type="text"
          placeholder="Дайте цьому резюме назву"
          value={titleValue}
          onChange={(e) => changeTitle(e.target.value)}
        />
      </div>
    </ConfirmCancelDialog>
  );
}
