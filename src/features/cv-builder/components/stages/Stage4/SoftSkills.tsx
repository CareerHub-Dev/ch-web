import NoItems from "../../list-items/NoItems";
import LargeBadge from "@/components/ui/LargeBadge";
import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";

export default function SoftSkills() {
  const { items, wasChanged } = useCvDataStore((s) => s.cvData.softSkills);
  const dispatchSoftSkills = useCvDataStore((s) => s.dispatchSoftSkills);

  const removeItem = (itemIndex: number) => {
    dispatchSoftSkills({ type: "remove", itemIndex });
  };

  if (items.length === 0) {
    const status = wasChanged ? "hasWarning" : "default";
    return <NoItems text={"Не додано софт скілів"} status={status} />;
  }

  return (
    <ul className="flex gap-4 flex-wrap">
      {items.map((item, itemIndex) => (
        <LargeBadge
          key={itemIndex}
          name={item}
          onRemove={() => removeItem(itemIndex)}
        />
      ))}
    </ul>
  );
}
