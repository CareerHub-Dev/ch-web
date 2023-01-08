import { Fragment, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import useInput from '@/hooks/useInput/v4';
import cn from 'classnames';
import NativeItemSelection from '../ui/NativeItemSelection';
import ValidatedInput from '../ui/ValidatedInput';

const buttonClass =
  'inline-flex w-full justify-center rounded-md border px-4 py-2 text-base font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto transition-all ease-in-out duration-200';

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

export default function AddOrEditLanguageModal({
  close,
  action,
  initialValues,
  title,
  actionText,
  languageIndex,
}: {
  close: () => void;
  action: (payload: Language & { languageIndex?: number }) => void;
  title: string;
  actionText: string;
  initialValues?: Language;
  languageIndex?: number;
}) {
  const nameInput = useInput({
    initialValue: initialValues?.name || '',
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
    LEVEL_OPTIONS.find((item) => item.name === initialValues?.name) ||
      LEVEL_OPTIONS.at(0)!
  );
  const handleAction = () => {
    action({
      languageIndex,
      level: level.id,
      name: nameInput.value,
    });
  };

  return (
    <Transition appear show as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="p-6">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
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
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className={cn(
                      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
                      buttonClass
                    )}
                    onClick={handleAction}
                  >
                    {actionText}
                  </button>
                  <button
                    type="button"
                    className={cn(
                      'mt-3 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 sm:mt-0',
                      buttonClass
                    )}
                    onClick={close}
                  >
                    Відміна
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
