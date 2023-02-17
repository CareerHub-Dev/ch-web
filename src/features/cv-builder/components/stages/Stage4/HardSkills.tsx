import LargeBadge from "@/components/ui/LargeBadge";
import EmptyState from "@/components/ui/EmptyState";

import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";

export default function HardSkills() {
  const dispatchHardSkills = useCvDataStore((s) => s.dispatchHardSkills);
  const items = useCvDataStore((s) => s.cvData.hardSkills.items);

  const removeItem = (itemIndex: number) => {
    dispatchHardSkills({ type: "remove", itemIndex });
  };
  return (
    <>
      {items.length === 0 ? (
        <EmptyState noItemsText={"Не додано хард скілів"} />
      ) : (
        <ul className="flex gap-4 flex-wrap">
          {items.map((item, itemIndex) => (
            <LargeBadge
              key={itemIndex}
              name={item}
              onRemove={() => removeItem(itemIndex)}
            />
          ))}
        </ul>
      )}
    </>
  );
}
