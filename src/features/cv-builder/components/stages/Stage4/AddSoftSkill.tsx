import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";
import AddItemForm from "./AddItemForm";

export default function AddSoftSkill() {
  const dispatchSoftSkills = useCvDataStore((s) => s.dispatchSoftSkills);
  return (
    <AddItemForm
      dispatchFn={dispatchSoftSkills}
      label="Персональні навички (Soft Skills)"
      id="soft-skill"
      skillType="soft"
    />
  );
}
