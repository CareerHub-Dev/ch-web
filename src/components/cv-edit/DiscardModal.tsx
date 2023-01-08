import { useCvDataStore } from '@/context/cv-data-store';
import { useCvUiStore } from '@/context/cv-ui-store';
import { useCvQueryData } from '@/hooks/useCvQuery';
import { ConfirmCancelDialog } from '../ui/ConfirmCancelDialog';

export default function DiscardModal() {
  const cvId = useCvDataStore((s) => s.cvId);
  const closeModal = useCvUiStore((s) => s.closeModal);
  const discard = useCvDataStore((s) => s.discardChanges);
  const isOpen = useCvUiStore((s) => s.currentModal) === 'discard';

  const cvData = useCvQueryData(cvId);

  const handleDiscard = () => {
    discard(cvData);
    closeModal();
  };

  return (
    <ConfirmCancelDialog
      title="Скасувати усі зміни?"
      confirmText="Так, скасувати"
      cancelText="Ні, не зараз"
      onClose={closeModal}
      onConfirm={handleDiscard}
      show={isOpen}
      confirmClasses="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
    >
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Усі поточні зміни буде відкинуто до останнього збереження
        </p>
      </div>
    </ConfirmCancelDialog>
  );
}
