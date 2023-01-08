import GenericList from '@/components/ui/GenericList';
import { useDialogActionsListReducer } from '@/hooks/useDialogActionsListReducer';
import LanguageItem from '../LanguageItem';
import RemoveItemModal from '../item-list/RemoveItemModal';
import { AddOrEditLanguageModal } from '../AddOrEditLanguageModal';

type Language = {
  name: string;
  level: string;
};

const languages: Language[] = [
  {
    name: 'English',
    level: 'C1',
  },
  {
    name: 'German',
    level: 'B2',
  },
];

export default function Stage5() {
  const [state, dispatch] = useDialogActionsListReducer<Language>();

  const createModificationHandler =
    (type: 'edit' | 'remove') =>
    (opts: { language: Language; languageIndex: number }) =>
    () => {
      dispatch({
        type,
        item: opts.language,
        itemIndex: opts.languageIndex,
      });
    };

  const createEditHandler = createModificationHandler('edit');
  const createRemoveHandler = createModificationHandler('remove');

  const handleAdd = () => dispatch({ type: 'add' });
  const handleClose = () =>
    dispatch({
      type: 'close',
    });

  const handleAddLanguage = () => {};
  const handleEditLanguage = () => {};
  const handleRemoveLanguage = () => {};

  const {
    dialog,
    editedItem: editedLanguage,
    editedItemIndex: editedLanguageIndex,
  } = state;

  return (
    <>
      {dialog === null ? null : dialog === 'remove' ? (
        <RemoveItemModal
          onClose={handleClose}
          onConfirm={handleRemoveLanguage}
          title="Видалити мову?"
          descriptionText={`Мова ${editedLanguage.name} буде видалена зі списку`}
        />
      ) : dialog === 'edit' ? (
        <AddOrEditLanguageModal
          onClose={handleClose}
          onConfirm={handleEditLanguage}
          initialPayload={{
            item: editedLanguage,
            itemIndex: editedLanguageIndex,
          }}
        />
      ) : (
        <AddOrEditLanguageModal
          onClose={handleClose}
          onConfirm={handleAddLanguage}
        />
      )}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h3 className="text-xl font-semibold text-gray-900">Іноземні мови</h3>
          <p className="mt-2 text-sm text-gray-700">
            Додайте знайомі іноземні мови
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Додати
          </button>
        </div>
      </div>

      <div className="mt-5 flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          <GenericList
            items={languages}
            keyExtractor={(_, index) => index}
            renderItem={(language, languageIndex) => (
              <LanguageItem
                {...language}
                onEditClick={createEditHandler({
                  language,
                  languageIndex,
                })}
                onRemoveClick={createRemoveHandler({
                  language,
                  languageIndex,
                })}
              />
            )}
          />
        </ul>
      </div>
    </>
  );
}
