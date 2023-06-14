import ListItemEditMenu from "@/components/ui/ListItemEditMenu";
import { ItemListAction } from "@/lib/list-reducer/dialog-actions";
import { Dispatch } from "react";
import { useBoolean } from "usehooks-ts";
import AddOrEditLinkDialog from "./AddOrEditLinkDialog";

export type CompanyLink = {
  title: string;
  uri: string;
};

export default function CompanyLink({
  item,
  itemIndex,
  actionHandler,
  editItem,
}: {
  item: CompanyLink;
  itemIndex: number;
  actionHandler: Dispatch<ItemListAction<CompanyLink>>;
  editItem: (item: CompanyLink, itemIndex: number) => void;
}) {
  const edited = useBoolean(false);
  const createActionHandler = (type: "edit" | "remove") => () => {
    actionHandler({
      type,
      itemIndex,
      item,
    });
  };
  const handleEditClick = edited.setTrue;
  const handleRemoveClick = createActionHandler("remove");
  const { title, uri } = item;

  return (
    <>
      <AddOrEditLinkDialog
        show={edited.value}
        initialPayload={{ item, itemIndex }}
        onClose={edited.setFalse}
        onAddItem={() => {}}
        onEditItem={editItem}
      />
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
    </>
  );
}
