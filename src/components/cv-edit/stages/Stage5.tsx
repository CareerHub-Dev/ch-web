import GenericList from '@/components/ui/GenericList';
import { useCvDataStore } from '@/context/cv-data-store';
import { useDialogActionsListReducer } from '@/hooks/useDialogActionsListReducer';
import AddOrEditLanguageModal from '../AddOrEditLanguageModal';
import RemoveItemModal from '../item-list/RemoveItemModal';
import LanguageItem from '../LanguageItem';

export default function Stage5() {
  const foreignLanguages = useCvDataStore((s) => s.cvData.foreignLanguages);
  const dispatchForeignLanguages = useCvDataStore(
    (s) => s.dispatchForeignLanguages
  );

  type ForeignLanguage = typeof foreignLanguages.items[number];

  const [state, dispatch] = useDialogActionsListReducer<ForeignLanguage>();

  const createModificationHandler =
    (type: 'edit' | 'remove') =>
    (opts: { language: ForeignLanguage; languageIndex: number }) =>
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

  const {
    dialog,
    focusedItem: focusedLanguage,
    focusedItemIndex: focusedLanguageIndex,
  } = state;

  const handleDialogConfirm = (payload: {
    item: ForeignLanguage;
    itemIndex: number;
  }) => {
    switch (dialog) {
      case 'add':
        dispatchForeignLanguages({
          type: 'add',
          item: payload.item,
        });
        break;
      case 'edit':
        dispatchForeignLanguages({
          type: 'edit',
          itemIndex: payload.itemIndex,
          newValue: payload.item,
        });
        break;
      case 'remove':
        dispatchForeignLanguages({
          type: 'remove',
          itemIndex: focusedLanguageIndex,
        });
        break;
      default:
        break;
    }
    dispatch({
      type: 'close',
    });
  };

  return (
    <>
      {dialog === null ? null : dialog === 'remove' ? (
        <RemoveItemModal
          onClose={handleClose}
          onConfirm={() =>
            handleDialogConfirm({
              item: focusedLanguage,
              itemIndex: focusedLanguageIndex,
            })
          }
          title="Видалити мову?"
          descriptionText={`Мова ${focusedLanguage.name} буде видалена зі списку`}
        />
      ) : dialog === 'edit' ? (
        <AddOrEditLanguageModal
          onClose={handleClose}
          onConfirm={handleDialogConfirm}
          initialPayload={{
            item: focusedLanguage,
            itemIndex: focusedLanguageIndex,
          }}
        />
      ) : (
        <AddOrEditLanguageModal
          onClose={handleClose}
          onConfirm={handleDialogConfirm}
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
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
          >
            Додати
          </button>
        </div>
      </div>

      <div className="mt-5 flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          <GenericList
            items={foreignLanguages.items}
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
