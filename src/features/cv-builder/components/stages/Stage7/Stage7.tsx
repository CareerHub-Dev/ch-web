import { useCvDataStore } from "../../../store/cv-data-store";
import { useDialogActionsListReducer } from "@/hooks/useDialogActionsListReducer";
import AddOrEditEducationModal from "../../modals/AddOrEditEducationModal";
import RemoveItemModal from "../../modals/RemoveItemModal";
import Educations from "./Educations";
import Stage7Tips from "./Stage7Tips";

export default function Stage7() {
    const educations = useCvDataStore((s) => s.cvData.educations);
    const dispatchEducations = useCvDataStore((s) => s.dispatchEducations);
    type Education = (typeof educations.items)[number];
    const { state: dialogState, dispatch } =
        useDialogActionsListReducer<Education>();

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
            {dialogState.dialog === "add" ? (
                <AddOrEditEducationModal onClose={handleDialogClose} />
            ) : dialogState.dialog === "edit" ? (
                <AddOrEditEducationModal
                    onClose={handleDialogClose}
                    initialPayload={{
                        item: dialogState.focusedItem,
                        itemIndex: dialogState.focusedItemIndex,
                    }}
                />
            ) : dialogState.dialog === "remove" ? (
                <RemoveItemModal
                    onClose={handleDialogClose}
                    onConfirm={() => {
                        dispatchEducations({
                            type: "remove",
                            itemIndex: dialogState.focusedItemIndex,
                        });
                        handleDialogClose();
                    }}
                    title="Видалити освіту?"
                    descriptionText={`Освіта ${dialogState.focusedItem.speciality} буде видалена зі списку`}
                />
            ) : null}
            <div className="space-y-6 sm:space-y-5">
                <div className="sm:pt-5 sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h3 className="text-xl font-medium leading-6 text-gray-900">
                            {"Освіта"}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            {"Додайте інформацію про освіту"}
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                            onClick={handleAddClick}
                        >
                            Додати
                        </button>
                    </div>
                </div>
                <Educations dispatchFn={dispatch} />
            </div>
            <Stage7Tips />
        </>
    );
}
