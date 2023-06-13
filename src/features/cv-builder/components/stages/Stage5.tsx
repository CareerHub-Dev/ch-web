import { useCvAssistanceStore } from "@/features/cv-builder/store/cv-assistance-store";
import { useCvDataStore } from "../../store/cv-data-store";
import { useDialogActionsListReducer } from "@/hooks/useDialogActionsListReducer";
import AddOrEditLanguageModal from "../modals/AddOrEditLanguageModal";
import AssistanceAlert from "../AssistantAlert";
import EmptyState from "@/components/ui/EmptyState";
import RemoveItemModal from "../modals/RemoveItemModal";
import LanguageItem from "../list-items/LanguageItem";

export default function Stage5() {
  const foreignLanguages = useCvDataStore((s) => s.cvData.foreignLanguages);
  const dispatchForeignLanguages = useCvDataStore(
    (s) => s.dispatchForeignLanguages
  );
  const isAssistEnabled = useCvAssistanceStore((s) => s.isAssistanceEnabled);
  type ForeignLanguage = (typeof foreignLanguages.items)[number];

  const { state, dispatch: dispatchAction } =
    useDialogActionsListReducer<ForeignLanguage>();

  const handleAdd = () => dispatchAction({ type: "add" });
  const handleClose = () =>
    dispatchAction({
      type: "close",
    });

  const {
    dialog,
    focusedItem: focusedLanguage,
    focusedItemIndex: focusedLanguageIndex,
  } = state;

  const handleRemoveItem = () => {
    if (focusedLanguageIndex === null) return;

    dispatchForeignLanguages({
      type: "remove",
      itemIndex: focusedLanguageIndex,
    });
    handleClose();
  };

  return (
    <>
      <RemoveItemModal
        onClose={handleClose}
        onConfirm={handleRemoveItem}
        show={dialog === "remove"}
        title="Видалити мову?"
        descriptionText={`Мова ${focusedLanguage?.name} буде видалена зі списку`}
      />
      {dialog === "edit" ? (
        <AddOrEditLanguageModal
          onClose={handleClose}
          initialPayload={{
            item: focusedLanguage,
            itemIndex: focusedLanguageIndex,
          }}
        />
      ) : dialog === "add" ? (
        <AddOrEditLanguageModal onClose={handleClose} />
      ) : null}
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

      {foreignLanguages.items.length > 0 ? (
        <div className="mt-5 flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {foreignLanguages.items.map((language, languageIndex) => (
              <LanguageItem
                key={languageIndex}
                itemIndex={languageIndex}
                item={language}
                actionHandler={dispatchAction}
              />
            ))}
          </ul>
        </div>
      ) : (
        <EmptyState
          withWarning={
            foreignLanguages.wasChanged &&
            foreignLanguages.warnings.length !== 0
          }
          noItemsText="Інозмених мов не додано"
        />
      )}

      {isAssistEnabled && (
        <div className="mt-6 flex flex-col gap-4">
          <AssistanceAlert title="Що варто вказати?">
            <p>
              Важливо вказати іноземні мови, які будуть корисні в роботі.
              Скоріше за все, работодавці будуть цікавитися вашим рівнем
              англійської
            </p>
          </AssistanceAlert>
          <AssistanceAlert type="warning" title="Лише іноземні мови!">
            <p>Не треба вказувати рідну мову - це зайве</p>
          </AssistanceAlert>
          <AssistanceAlert type="positive" title="Гарний приклад:">
            <p>English - C1</p>
            <p>German - B2</p>
          </AssistanceAlert>
        </div>
      )}
    </>
  );
}
