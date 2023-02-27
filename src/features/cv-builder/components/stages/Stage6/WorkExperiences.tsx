import { useCvDataStore } from "../../../store/cv-data-store";
import { useDialogActionsListReducer } from "@/hooks/useDialogActionsListReducer";
import RemoveItemModal from "../../modals/RemoveItemModal";
import WorkExperienceItem from "../../list-items/WorkExperienceItem";
import { type WorkExperience } from "@/features/cv-builder/store/cv-data-store/cv";
import AddOrEditWorkExperienceModal from "../../modals/AddOrEditWorkExperienceModal";
import NoItems from "../../list-items/NoItems";

export default function WorkExperiences() {
  const noWorkExperience = useCvDataStore((s) => s.noWorkExperience);
  const toggleNoWorkExperiences = useCvDataStore(
    (s) => s.toggleNoWorkExperience
  );
  const workExperiences = useCvDataStore((s) => s.cvData.workExperiences);
  const dispatchWorkExperiences = useCvDataStore(
    (s) => s.dispatchWorkExperiences
  );

  const [state, dispatch] = useDialogActionsListReducer<WorkExperience>();
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
          onConfirm={() => {
            dispatchWorkExperiences({
              type: "remove",
              itemIndex: focusedItemIndex,
            });
            handleDialogClose();
          }}
          title="Видалити?"
          descriptionText={`Опит роботи ${focusedItem.title} буде видалено зі списку`}
        />
      ) : dialog === "edit" ? (
        <AddOrEditWorkExperienceModal
          onClose={handleDialogClose}
          initialPayload={{
            item: focusedItem,
            itemIndex: focusedItemIndex,
          }}
        />
      ) : (
        <AddOrEditWorkExperienceModal onClose={handleDialogClose} />
      )}

      <div className="sm:border-t sm:border-gray-200 sm:pt-5 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h4 className="text-lg font-medium text-gray-900">Досвід роботи</h4>
          <p className="mt-2 text-sm text-gray-700">
            Опишіть свій досвід роботи, якщо він є
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleAddClick}
            disabled={noWorkExperience}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:bg-blue-600"
          >
            Додати
          </button>
        </div>
      </div>
      {noWorkExperience ? (
        <NoItems text="Немає досвіду" status="default" />
      ) : workExperiences.items.length > 0 ? (
        <div className="mt-5 flow-root">
          <ul role="list" className="divide-y divide-gray-200">
            {workExperiences.items.map((item, itemIndex) => (
              <WorkExperienceItem
                key={itemIndex}
                itemIndex={itemIndex}
                item={item}
                dispatchAction={dispatch}
              />
            ))}
          </ul>
        </div>
      ) : (
        <NoItems text="Немає досвіду" status="default" />
      )}

      <div className="flex h-5 items-center">
        <input
          id="no-work-experience"
          aria-describedby="no-work-experience"
          name="no-work-experience"
          type="checkbox"
          checked={noWorkExperience}
          onChange={toggleNoWorkExperiences}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label
          htmlFor="no-work-experience"
          className="ml-3 text-sm font-medium text-gray-700"
        >
          В мене немає досвіду роботи
        </label>
      </div>
    </>
  );
}
