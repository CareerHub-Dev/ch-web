import EmptyState from "@/components/ui/EmptyState";
import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";
import AddHardSkill from "./AddHardSkill";
import HardSkillPill from "./HardSkillPill";

export default function HardSkillsSection() {
  const { items } = useCvDataStore((s) => s.cvData.hardSkills);

  return (
    <>
      <AddHardSkill />
      {items.length === 0 ? (
        <EmptyState noItemsText={"Не додано хард скілів"} />
      ) : (
        <ul>
          {items.map((item, itemIndex) => (
            <HardSkillPill key={item} name={item} index={itemIndex} />
          ))}
        </ul>
      )}
    </>
  );
}
