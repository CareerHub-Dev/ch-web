import { PlusIcon } from "@heroicons/react/24/solid";
import { useStudentProfileStore } from "../store/student-profile-store";

export default function AddExperienceButton() {
    const openModal = useStudentProfileStore((s) => s.openModal);

    const handleAddExperience = () => {
        openModal("addExperience");
    };
    return (
        <button
            type="button"
            className="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
            onClick={handleAddExperience}
        >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">{"Додати досвід"}</span>
        </button>
    );
}
