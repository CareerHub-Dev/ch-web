import ListItemEditMenu from "@/components/ui/ListItemEditMenu";
import { ItemListAction } from "@/lib/list-reducer/dialog-actions";
import { Dispatch } from "react";

export type CompanyLink = {
  title: string;
  uri: string;
};

export default function CompanyLink({
  item,
  itemIndex,
  actionHandler,
}: {
  item: CompanyLink;
  itemIndex: number;
  actionHandler: Dispatch<ItemListAction<CompanyLink>>;
}) {
  const createActionHandler = (type: "edit" | "remove") => () => {
    actionHandler({
      type,
      itemIndex,
      item,
    });
  };
  const handleEditClick = createActionHandler("edit");
  const handleRemoveClick = createActionHandler("remove");
  const { title, uri } = item;

  return (
    <li className="py-4">
      <div className="flex items-center space-x-4">
        <div className="min-w-0 flex-1">
          <a
            target={"_blank"}
            rel="noreferrer"
            href={uri}
            className="truncate text-sm font-medium text-blue-900 underline"
          >
            {title}
          </a>
        </div>
        <ListItemEditMenu
          onEditClick={handleEditClick}
          onRemoveClick={handleRemoveClick}
        />
      </div>
    </li>
  );
}
