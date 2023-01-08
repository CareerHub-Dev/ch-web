import useInput from '@/hooks/useInput/v4';
import { useState } from 'react';
import NativeItemSelection from '../ui/NativeItemSelection';
import ValidatedInput from '../ui/ValidatedInput';
import AddOrEditItemModal from './item-list/AddOrEditItemModal';

type Language = {
  name: string;
  level: string;
};

const LEVEL_OPTIONS = [
  { name: 'A1', id: 'A1' },
  { name: 'A2', id: 'A2' },
  { name: 'B1', id: 'B1' },
  { name: 'B2', id: 'B2' },
  { name: 'C1', id: 'C1' },
  { name: 'C2', id: 'C2' },
];

export function AddOrEditLanguageModal(props: {
  onClose: () => void;
  onConfirm: (payload: { item: Language }) => void;
}): JSX.Element;

export function AddOrEditLanguageModal(props: {
  onClose: () => void;
  onConfirm: (payload: { item: Language; itemIndex: number }) => void;
  initialPayload: { item: Language; itemIndex: number };
}): JSX.Element;

export function AddOrEditLanguageModal(props: {
  onClose: () => void;
  onConfirm: (payload: { item: Language; itemIndex: number }) => void;
  initialPayload?: { item: Language; itemIndex: number };
}) {
  const type = typeof props.initialPayload === 'undefined' ? 'add' : 'edit';

  const nameInput = useInput({
    initialValue: props.initialPayload?.item.name || '',
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
      (item) => item.name === props.initialPayload?.item.name
    ) || LEVEL_OPTIONS.at(0)!
  );

  const handleConfirm = () => {
    let payload = {
      item: {
        level: level.id,
        name: nameInput.value,
      },
    } as { item: Language; itemIndex: number };

    if (type === 'edit') {
      payload.itemIndex = props.initialPayload!.itemIndex;
    }

    props.onConfirm(payload as { item: Language; itemIndex: number });
  };

  return (
    <AddOrEditItemModal
      onClose={props.onClose}
      onConfirm={handleConfirm}
      type={type}
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
