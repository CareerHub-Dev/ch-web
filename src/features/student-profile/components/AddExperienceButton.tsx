import { PlusIcon } from "@heroicons/react/24/solid";
import { useBoolean } from "usehooks-ts";
import DialogWithBackdrop from "../../../components/ui/dialog/DialogWithBackdrop";
import AddExperienceForm from "./AddExperienceForm";

export default function AddExperienceButton() {
    const isModalOpen = useBoolean(false);

    return (
        <>
            <DialogWithBackdrop
                title={"Додати"}
                onClose={isModalOpen.setFalse}
                show={isModalOpen.value}
            >
                <AddExperienceForm
                    onSuccess={isModalOpen.setFalse}
                    onCancel={isModalOpen.setFalse}
                />
            </DialogWithBackdrop>
            <button
                type="button"
                className="rounded-full p-1 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={isModalOpen.setTrue}
            >
                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">{"Додати досвід"}</span>
            </button>
        </>
    );
}
