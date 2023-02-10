import { useInput } from '@/hooks/useInput/v4';
import { useState } from 'react';
import { useCvDataStore } from '@/context/cv-data-store';
import NativeItemSelection from '../ui/NativeItemSelection';
import { ValidatedInput } from '../ui/ValidatedInput';
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

export default function AddOrEditLanguageModal({
  onClose,
  initialPayload,
}: {
  onClose: () => void;
  initialPayload?: { item: ForeignLanguage; itemIndex: number };
}) {
  const formType = !initialPayload ? 'add' : 'edit';
  const dispatchLanguages = useCvDataStore((s) => s.dispatchForeignLanguages);

  const nameInput = useInput({
    initialValue: initialPayload?.item.name ?? '',
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
      (item) => item.id === initialPayload?.item.languageLevel
    ) || LEVEL_OPTIONS.at(0)!
  );

  const handleConfirm = () => {
    if (!initialPayload) {
      dispatchLanguages({
        type: 'add',
        item: {
          name: nameInput.value,
          languageLevel: level.id,
        },
      });
    } else {
      dispatchLanguages({
        type: 'edit',
        itemIndex: initialPayload.itemIndex,
        newValue: {
          name: nameInput.value,
          languageLevel: level.id,
        },
      });
    }
    onClose();
  };

  return (
    <AddOrEditItemModal
      onClose={onClose}
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
            wasChanged={nameInput.wasChanged}
            wasBlurred={nameInput.wasBlurred}
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
