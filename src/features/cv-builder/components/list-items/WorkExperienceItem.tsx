import { type ItemListAction } from "@/lib/list-reducer/dialog-actions";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { type Dispatch } from "react";
import ListItemEditMenu from "@/components/ui/ListItemEditMenu";
import { type WorkExperience } from "../../store/cv-data-store/cv";

export default function WorkExperienceItem({
  item,
  itemIndex,
  dispatchAction,
}: {
  item: WorkExperience;
  itemIndex: number;
  dispatchAction: Dispatch<ItemListAction<WorkExperience>>;
}) {
  const createActionHandler = (type: "edit" | "remove") => () => {
    dispatchAction({
      type,
      itemIndex,
      item,
    });
  };
  const handleEditClick = createActionHandler("edit");
  const handleRemoveClick = createActionHandler("remove");
  const startDate = new Date(item.startYear);
  startDate.setMonth(Number(item.startMonth));
  const endDate = new Date(item.endYear);
  endDate.setMonth(Number(item.endMonth));
  const displayedStartDate = startDate.toLocaleDateString("uk-UA", {
    month: "long",
    year: "numeric",
  });
  const displayedEndDate = item.isCurrent
    ? "Досі"
    : endDate.toLocaleDateString("uk-UA", {
        month: "long",
        year: "numeric",
      });

  return (
    <li className="flex items-center px-4 py-4 sm:px-6">
      <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
        <div className="truncate">
          <div className="flex text-sm">
            <p className="truncate font-semibold text-gray-900">{`${item.title}, ${item.company}:`}</p>
            <p className="ml-1 flex-shrink-0 font-normal text-gray-500">
              {item.description}
            </p>
          </div>
          <div className="mt-2 flex">
            <div className="flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <p>{`${displayedStartDate} - ${displayedEndDate}`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-5 flex-shrink-0">
        <ListItemEditMenu
          onEditClick={handleEditClick}
          onRemoveClick={handleRemoveClick}
        />
      </div>
    </li>
  );
}
