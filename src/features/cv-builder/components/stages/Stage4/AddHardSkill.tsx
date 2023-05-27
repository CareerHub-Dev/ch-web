import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";
import AddItemForm from "./AddItemForm";

export default function AddHardSkill() {
    const dispatchHardSkills = useCvDataStore((s) => s.dispatchHardSkills);
    return (
        <AddItemForm
            id="hard-skill"
            skillType="hard"
            label="Техничні навички (Hard Skills)"
            dispatchFn={dispatchHardSkills}
        />
    );
}
