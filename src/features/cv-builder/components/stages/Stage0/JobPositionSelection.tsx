import ItemSelection from "@/components/ui/ItemsSelection";
import { SELECTION_ITEMS } from "../../mocks/job-directions";

export default function JobPositionSelection() {
  const items = SELECTION_ITEMS as { id: string; name: string }[];
  return (
  <>
    <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
      <ItemSelection
        items={items}
        selectedItem={{ id: "-1", name: "Оберіть напрямок" }}
        setSelected={() => {}}
        onBlur={() => {}}
        label="Напрямок роботи"
        hasError={false}
      />
    </div>
     
    <div className="sm:grid sm:grid-cols-2 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
      <input />
    </div>
    </>
  );
}
