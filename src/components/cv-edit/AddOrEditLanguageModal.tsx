import useInput from '@/hooks/useInput/v4';
import { useState } from 'react';
import NativeItemSelection from '../ui/NativeItemSelection';
import ValidatedInput from '../ui/ValidatedInput';
import AddOrEditItemModal from './item-list/AddOrEditItemModal';
import { type ForeignLanguage } from '@/context/cv-data-store/cv';

const LEVEL_OPTIONS = [
  { name: 'A1', id: 'A1' },
  { name: 'A2', id: 'A2' },
  { name: 'B1', id: 'B1' },
  { name: 'B2', id: 'B2' },
  { name: 'C1', id: 'C1' },
  { name: 'C2', id: 'C2' },
];

export default function AddOrEditLanguageModal(props: {
  onClose: () => void;
  onConfirm: (payload: { item: ForeignLanguage; itemIndex: number }) => void;
  initialPayload?: { item: ForeignLanguage; itemIndex: number };
}) {
  const formType = !props.initialPayload ? 'add' : 'edit';

  const nameInput = useInput({
    initialValue: props.initialPayload?.item.name ?? '',
    validators: [
      (val) => {
        return val.length > 0
          ? { type: 'success' }
          : {
              type: 'error',
              message: 'Назва мови має містити хоча б один символ',
            };
      },
    ],
  });
  const [level, setLevel] = useState(
    LEVEL_OPTIONS.find(
      (item) => item.id === props.initialPayload?.item.languageLevel
    ) || LEVEL_OPTIONS.at(0)!
  );

  const handleConfirm = () => {
    const item = {
      name: nameInput.value,
      languageLevel: level.id,
    } satisfies ForeignLanguage;

    const payload = {
      item,
    } as unknown as { item: ForeignLanguage; itemIndex: number };

    if (formType === 'edit') {
      payload.itemIndex = props.initialPayload!.itemIndex;
    }
    props.onConfirm(payload);
  };

  return (
    <AddOrEditItemModal
      onClose={props.onClose}
      onConfirm={handleConfirm}
      type={formType}
      confirmationDisabled={nameInput.errors.length > 0}
    >
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <ValidatedInput
            id="name"
            value={nameInput.value}
            onChange={nameInput.change}
            errors={nameInput.errors}
            warnings={nameInput.warnings}
            isTouched={nameInput.isTouched}
            label="Мова"
          />
        </div>
        <div>
          <NativeItemSelection
            id="level"
            items={LEVEL_OPTIONS}
            selectedItem={level}
            setSelected={setLevel}
            label="Рівень знання"
          />
        </div>
      </div>
    </AddOrEditItemModal>
  );
}
