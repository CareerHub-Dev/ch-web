import { useCvDataStore } from '../../store/cv-data-store';
import { type ProjectLink } from '../../store/cv-data-store/cv';
import { useInput } from '@/hooks/useInput';
import ValidatedInput from '@/components/ui/ValidatedInput';
import AddOrEditItemModal from './AddOrEditItemModal';

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
            onBlur={titleInput.blur}
            errors={titleInput.errors}
            warnings={titleInput.warnings}
            wasChanged={titleInput.wasChanged}
            wasBlurred={titleInput.wasBlurred}
            label="Назва"
          />
        </div>
        <div>
          <ValidatedInput
            id="url"
            value={urlInput.value}
            onChange={urlInput.change}
            onBlur={urlInput.blur}
            errors={urlInput.errors}
            warnings={urlInput.warnings}
            wasChanged={urlInput.wasChanged}
            wasBlurred={urlInput.wasBlurred}
            label="Адреса"
          />
        </div>
      </div>
    </AddOrEditItemModal>
  );
}
