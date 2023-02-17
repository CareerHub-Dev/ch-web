import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";
import AddItemForm from "./AddItemForm";

export default function AddHardSkill() {
  const dispatchHardSkills = useCvDataStore((s) => s.dispatchHardSkills);
  return (
    <AddItemForm
      id="hard-skill"
      label="Додати хард скіл"
      dispatchFn={dispatchHardSkills}
    />
  );
}
