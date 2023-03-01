import { useCvDataStore } from "../../../store/cv-data-store";
import { useDialogActionsListReducer } from "@/hooks/useDialogActionsListReducer";
import { AddOrEditProjectLinkModal } from "../../modals/AddOrEditProjectLinkModal";
import RemoveItemModal from "../../modals/RemoveItemModal";
import ProjectLinkItem from "../../ProjectLinkItem";
import NoItems from "../../list-items/NoItems";

export default function ProjectLinks() {
  const projectLinks = useCvDataStore((s) => s.cvData.projectLinks);
  type ProjectLink = (typeof projectLinks.items)[number];

  const dispatchProjectLinks = useCvDataStore((s) => s.dispatchProjectLinks);

  const [state, dispatch] = useDialogActionsListReducer<ProjectLink>();
  const { dialog, focusedItem, focusedItemIndex } = state;

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
        <NoItems status="default" text="Посилань не додано" />
      )}
    </>
  );
}
