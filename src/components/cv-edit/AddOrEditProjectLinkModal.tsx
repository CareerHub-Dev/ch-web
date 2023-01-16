import { type ProjectLink } from '@/context/cv-data-store/cv';
import useInput from '@/hooks/useInput/v4';
import ValidatedInput from '../ui/ValidatedInput';
import AddOrEditItemModal from './item-list/AddOrEditItemModal';

export function AddOrEditProjectLinkModal(props: {
  onClose: () => void;
  onConfirm: (payload: { item: ProjectLink; itemIndex: number }) => void;
  initialPayload?: { item: ProjectLink; itemIndex: number };
}) {
  const type = !props.initialPayload ? 'add' : 'edit';

  const titleInput = useInput({
    initialValue: props.initialPayload?.item.title || '',
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
    initialValue: props.initialPayload?.item.url || '',
    validators: [
      (val) => {
        return val.length > 0
          ? { type: 'success' }
          : {
              type: 'error',
              message: 'Адреса має містити хоча б один символ',
            };
      },
    ],
  });

  const handleConfirm = () => {
    let payload = {
      item: {
        title: titleInput.value,
        url: urlInput.value,
      },
    } as { item: ProjectLink; itemIndex: number };

    if (type === 'edit') {
      payload.itemIndex = props.initialPayload!.itemIndex;
    }
    props.onConfirm(payload);
  };

  return (
    <AddOrEditItemModal
      onClose={props.onClose}
      onConfirm={handleConfirm}
      type={type}
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
