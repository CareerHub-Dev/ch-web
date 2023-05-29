import ListItemEditMenu from "@/components/ui/ListItemEditMenu";
import { ProjectLink } from "../store/cv-data-store/cv";
import { ItemListAction } from "@/lib/list-reducer/dialog-actions";
import { Dispatch } from "react";

export default function ProjectLinkItem({
  item,
  itemIndex,
  actionHandler,
}: {
  item: ProjectLink;
  itemIndex: number;
  actionHandler: Dispatch<ItemListAction<ProjectLink>>;
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

  const { title, url } = item;

  return (
    <li className="py-4">
      <div className="flex items-center space-x-4">
        <div className="min-w-0 flex-1">
          <a
            target={"_blank"}
            rel="noreferrer"
            href={url}
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
