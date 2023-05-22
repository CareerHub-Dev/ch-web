import LargeBadge from "@/components/ui/LargeBadge";
import NoItems from "../../list-items/NoItems";
import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";

export default function HardSkills() {
    const dispatchHardSkills = useCvDataStore((s) => s.dispatchHardSkills);

    const { items, wasChanged } = useCvDataStore((s) => s.cvData.hardSkills);

    const removeItem = (itemIndex: number) => {
        dispatchHardSkills({ type: "remove", itemIndex });
    };

    if (items.length === 0) {
        const status = wasChanged ? "hasWarning" : "default";
        return <NoItems text={"Нічого не додано"} status={status} />;
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
