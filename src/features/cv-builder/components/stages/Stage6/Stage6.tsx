import { useCvAssistanceStore } from "@/features/cv-builder/store/cv-assistance-store";
import {
  getExperienceHighlightsActions,
  useCvDataStore,
} from "../../../store/cv-data-store";
import { useDialogActionsListReducer } from "@/hooks/useDialogActionsListReducer";
import { type ChangeEvent } from "react";
import { AddOrEditProjectLinkModal } from "../../modals/AddOrEditProjectLinkModal";
import AssistanceAlert from "../../AssistantAlert";
import EmptyState from "@/components/ui/EmptyState";
import RemoveItemModal from "../../modals/RemoveItemModal";
import ProjectLinkItem from "../../ProjectLinkItem";

export default function Stage6() {
  const isAssistEnabled = useCvAssistanceStore((s) => s.isAssistanceEnabled);
  const experienceHighlights = useCvDataStore(
    (s) => s.cvData.experienceHighlights
  );
  const experienceHighlightsActions = useCvDataStore(
    getExperienceHighlightsActions
  );
  const projectLinks = useCvDataStore((s) => s.cvData.projectLinks);
  type ProjectLink = (typeof projectLinks.items)[number];

  const dispatchProjectLinks = useCvDataStore((s) => s.dispatchProjectLinks);

  const [state, dispatch] = useDialogActionsListReducer<ProjectLink>();
  const { dialog, focusedItem, focusedItemIndex } = state;

  const handleExperienceHighlightsChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    experienceHighlightsActions.change(e.target.value);
  };

  const handleAddClick = () =>
    dispatch({
      type: "add",
    });

  const handleDialogClose = () =>
    dispatch({
      type: "close",
    });

  return (
    <>
      {dialog === null ? null : dialog === "remove" ? (
        <RemoveItemModal
          onClose={handleDialogClose}
          onConfirm={() =>
            dispatchProjectLinks({
              type: "remove",
              itemIndex: focusedItemIndex,
            })
          }
          title="Видалити посилання?"
          descriptionText={`Посилання ${focusedItem.title} буде видалено зі списку`}
        />
      ) : dialog === "edit" ? (
        <AddOrEditProjectLinkModal
          onClose={handleDialogClose}
          initialPayload={{
            item: focusedItem,
            itemIndex: focusedItemIndex,
          }}
        />
      ) : (
        <AddOrEditProjectLinkModal onClose={handleDialogClose} />
      )}
      <div className="space-y-6 sm:space-y-5">
        <div>
          <label
            htmlFor="experienceHighlights"
            className="text-xl font-medium leading-6 text-gray-900"
          >
            {"Досвід"}
          </label>
          <textarea
            id="experienceHighlights"
            name="experienceHighlights"
            rows={3}
            className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            value={experienceHighlights.value}
            onChange={handleExperienceHighlightsChange}
          />
          <p className="mt-2 text-sm text-gray-500">
            {
              "Напишіть не більше 200 слів про свій досвід, а саме про моменти, які вважаєте найважливими"
            }
          </p>
        </div>

        {isAssistEnabled && (
          <AssistanceAlert>
            <p>{`Опишіть найважливіші аспекти вашої професійної діяльності. Навіть у разі відсутності комерційного досвіду варто вказати те, що, пов'язано із вакансією`}</p>
          </AssistanceAlert>
        )}

        <div className="sm:border-t sm:border-gray-200 sm:pt-5 sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h4 className="text-lg font-medium text-gray-900">Посилання</h4>
            <p className="mt-2 text-sm text-gray-700">
              Додайте посилання на свої проекти
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={handleAddClick}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
            >
              Додати
            </button>
          </div>
        </div>
        {projectLinks.items.length > 0 ? (
          <div className="mt-5 flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {projectLinks.items.map((item, itemIndex) => (
                <ProjectLinkItem
                  key={itemIndex}
                  itemIndex={itemIndex}
                  item={item}
                  actionHandler={dispatch}
                />
              ))}
            </ul>
          </div>
        ) : (
          <EmptyState noItemsText="Посилань не додано" />
        )}
      </div>
      {isAssistEnabled ? (
        <div className="mt-6 flex flex-col gap-4">
          <AssistanceAlert>
            <p>
              Ще можна залишити корисні посилання на власні проекти для
              демонстрації портфоліо.
            </p>
          </AssistanceAlert>
          <AssistanceAlert type="warning">
            <p>Переконайтеся, що усі посилання клікабельні.</p>
          </AssistanceAlert>

          <AssistanceAlert type="negative">
            <p>Не потрібно залишати посилання на непрофесійні соцмережи</p>
          </AssistanceAlert>
        </div>
      ) : null}
    </>
  );
}
