import EmptyState from "@/components/ui/EmptyState";
import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";
import AddHardSkill from "./AddHardSkill";
import LargeBadge from "@/components/ui/LargeBadge";

export default function HardSkillsSection() {
  const items = useCvDataStore((s) => s.cvData.hardSkills.items);
  const dispatchHardSkills = useCvDataStore((s) => s.dispatchHardSkills);

  const removeItem = (itemIndex: number) => {
    dispatchHardSkills({ type: "remove", itemIndex });
  };

  return (
    <>
      <AddHardSkill />
      {items.length === 0 ? (
        <EmptyState noItemsText={"Не додано хард скілів"} />
      ) : (
        <ul className="flex gap-4 flex-wrap">
          {items.map((item, itemIndex) => (
            <LargeBadge
              key={item}
              name={item}
              onRemove={() => removeItem(itemIndex)}
            />
          ))}
        </ul>
      )}
    </>
  );
}
