import WorkExperienceForm from "@/features/work-experience/components/WorkExperienceForm";
import { useCvDataStore } from "../../store/cv-data-store";
import AddOrEditItemModal from "./AddOrEditItemModal";
import { useWorkExperienceInputs } from "@/features/work-experience/hooks/use-work-experience-inputs";
import { WorkExperience } from "@/features/work-experience/types";

export default function AddOrEditWorkExperienceModal({
    onClose,
    initialPayload,
}: {
    onClose: () => void;
    initialPayload?: { item: WorkExperience; itemIndex: number };
}) {
    const dispatchWorkExperiences = useCvDataStore(
        (s) => s.dispatchWorkExperiences
    );
    const workExperienceInputs = useWorkExperienceInputs(initialPayload?.item);
    const { blurAll, thereAreSomeInvalidInputs, thereAreSomeBlurredErrors, values } = workExperienceInputs;
    const formType = !initialPayload ? "add" : "edit";

    const handleConfirm = () => {
        if (thereAreSomeBlurredErrors) return;
        if (thereAreSomeInvalidInputs) {
            blurAll();
            return;
        }

        if (!initialPayload) {
            dispatchWorkExperiences({
                type: "add",
                item: values,
            });
        } else {
            dispatchWorkExperiences({
                type: "edit",
                itemIndex: initialPayload.itemIndex,
                newValue: values,
            });
        }
        onClose();
    };

    return (
        <AddOrEditItemModal
            onClose={onClose}
            onConfirm={handleConfirm}
            type={formType}
            confirmationDisabled={thereAreSomeBlurredErrors}
        >
            <WorkExperienceForm {...workExperienceInputs} />
        </AddOrEditItemModal>
    );
}
