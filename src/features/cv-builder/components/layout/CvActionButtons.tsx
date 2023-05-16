import { useCvUiStore } from "../../store/cv-ui-store";
import { useCvDataStore } from "../../store/cv-data-store";
import { getStageCompletionStatus } from "../../store/cv-data-store";

export default function CvActionButtons() {
    const openSaveModal = useCvUiStore((s) => s.openSaveModal);
    const stage0 = useCvDataStore(getStageCompletionStatus(0));
    const cvCanBeSaved = stage0 === "complete" || stage0 === "hasWarnings";

    return (
        <span className="isolate inline-flex rounded-md shadow-sm">
            <button
                type="button"
                onClick={openSaveModal}
                disabled={!cvCanBeSaved}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 enabled:hover:bg-gray-50 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
                {"Зберегти"}
            </button>
        </span>
    );
}
