import EmptyState from "@/components/ui/EmptyState";
import LargeBadge from "@/components/ui/LargeBadge";
import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";

export default function SoftSkills() {
  const items = useCvDataStore((s) => s.cvData.softSkills.items);
  const dispatchSoftSkills = useCvDataStore((s) => s.dispatchSoftSkills);

  const removeItem = (itemIndex: number) => {
    dispatchSoftSkills({ type: "remove", itemIndex });
  };

  return (
    <>
      {items.length === 0 ? (
        <EmptyState noItemsText={"Не додано софт скілів"} />
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
