import { useCvDataStore } from "@/features/cv-builder/store/cv-data-store";
import { Education } from "@/features/cv-builder/store/cv-data-store/cv";
import { ItemListAction } from "@/lib/list-reducer/dialog-actions";
import { Dispatch } from "react";
import EducationItem from "../../list-items/EducationItem";
import NoItems from "../../list-items/NoItems";

export default function Educations(props: {
  dispatchFn: Dispatch<ItemListAction<Education>>;
}) {
  const { items, wasChanged } = useCvDataStore((s) => s.cvData.educations);

  if (items.length === 0) {
    const status = wasChanged ? "hasWarning" : "default";
    return <NoItems text={"Нічого не додано"} status={status} />;
  }

  return (
    <div className="mt-5 flow-root">
      <ul role="list" className="divide-y divide-gray-200">
        {items.map((item, itemIndex) => (
          <EducationItem
            key={itemIndex}
            item={item}
            itemIndex={itemIndex}
            dispatchAction={props.dispatchFn}
          />
        ))}
      </ul>
    </div>
  );
}
