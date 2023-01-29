import { useCvDataStore } from '@/context/cv-data-store';
import { type ProjectLink } from '@/context/cv-data-store/cv';
import { useInput } from '@/hooks/useInput/v4';
import ValidatedInput from '../ui/ValidatedInput';
import AddOrEditItemModal from './item-list/AddOrEditItemModal';

export function AddOrEditProjectLinkModal({
  onClose,
  initialPayload,
}: {
  onClose: () => void;
  initialPayload?: { item: ProjectLink; itemIndex: number };
}) {
  const modalType = typeof initialPayload === 'undefined' ? 'add' : 'edit';
  const dispatchProjectLinks = useCvDataStore((s) => s.dispatchProjectLinks);

  const titleInput = useInput({
    initialValue: initialPayload?.item.title || '',
    validators: [
      (val) => {
        return val.length > 0
          ? { type: 'success' }
          : {
              type: 'error',
              message: 'Назва посилання має містити хоча б один символ',
            };
      },
    ],
  });

  const urlInput = useInput({
    initialValue: initialPayload?.item.url || '',
    validators: [
      (val) =>
        val.length > 0
          ? { type: 'success' }
          : {
              type: 'error',
              message: 'Адреса має містити хоча б один символ',
            },
      (val) =>
        val.startsWith('http://') || val.startsWith('https://')
          ? {
              type: 'success',
            }
          : {
              type: 'warning',
              message:
                'Краще почати посилання з протоколу (`http://` або `https://`)',
            },
    ],
  });

  const handleConfirm = () => {
    const values = {
      title: titleInput.value,
      url: urlInput.value,
    };

    if (!initialPayload) {
      dispatchProjectLinks({
        type: 'add',
        item: values,
      });
    } else {
      dispatchProjectLinks({
        type: 'edit',
        itemIndex: initialPayload.itemIndex,
        newValue: values,
      });
    }
    onClose();
  };

  return (
    <AddOrEditItemModal
      onClose={onClose}
      onConfirm={handleConfirm}
      type={modalType}
      confirmationDisabled={
        titleInput.errors.length > 0 || urlInput.errors.length > 0
      }
    >
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <ValidatedInput
            id="title"
            value={titleInput.value}
            onChange={titleInput.change}
            errors={titleInput.errors}
            warnings={titleInput.warnings}
            isTouched={titleInput.isTouched}
            label="Назва"
          />
        </div>
        <div>
          <ValidatedInput
            id="url"
            value={urlInput.value}
            onChange={urlInput.change}
            errors={urlInput.errors}
            warnings={urlInput.warnings}
            isTouched={urlInput.isTouched}
            label="Адреса"
          />
        </div>
      </div>
    </AddOrEditItemModal>
  );
}
