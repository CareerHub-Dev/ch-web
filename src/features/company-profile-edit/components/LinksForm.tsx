import RemoveLinkDialog from "./RemoveLinkDialog";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import useToast from "@/hooks/useToast";
import NoItems from "@/features/cv-builder/components/list-items/NoItems";
import parseUnknownError from "@/lib/parse-unknown-error";
import CompanyLink from "./CompanyLink";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SecondaryButton from "@/components/ui/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { editCompanyLinks } from "@/lib/api/company";
import { useDialogActionsListReducer } from "@/hooks/useDialogActionsListReducer";
import { useArrayInput } from "@/hooks/useArrayInput";
import { PlusIcon } from "@heroicons/react/24/solid";
import AddOrEditLinkDialog from "./AddOrEditLinkDialog";

export default function LinksForm({
  links,
}: {
  links: { title: string; uri: string }[];
}) {
  const toast = useToast();
  const {
    items,
    add: addItem,
    remove: removeItem,
    edit: editItem,
    reset: resetItems,
    wasChanged,
  } = useArrayInput({
    initialValues: links,
    getId: (item) => item.uri,
  });
  const { state, close, dispatch, add } = useDialogActionsListReducer<{
    title: string;
    uri: string;
  }>();
  const { dialog, focusedItem } = state;
  const { mutate, isLoading } = useProtectedMutation(
    ["edit-detail"],
    editCompanyLinks,
    {
      onSuccess: () => {
        toast.success("Зміни збережено");
        resetItems(items);
      },
      onError: (error) => {
        toast.error(parseUnknownError(error));
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(items);
  };

  return (
    <>
      <AddOrEditLinkDialog
        show={dialog === "add" || dialog === "edit"}
        onClose={close}
        onAddItem={addItem}
        onEditItem={editItem}
      />
      <RemoveLinkDialog
        show={dialog === "remove"}
        linkTitle={focusedItem?.title ?? ""}
        onClose={close}
        onConfirm={() => removeItem(focusedItem!)}
      />
      <div>
        <h2 className="text-base font-semibold leading-7 text-black">
          {"Посилання"}
        </h2>

        <p className="mt-1 text-sm leading-6 text-gray-400">
          {
            "Ці посилання відображатимуться у вашому публічному профілі. Максимальна кількість - 5 посилань."
          }
        </p>
      </div>

      <form className="md:col-span-2" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="sm:col-span-3">
            <SecondaryButton
              type="button"
              className="flex items-center justify-center"
              onClick={add}
            >
              <PlusIcon className="h-5 w-5 mr-2 inline-block" />
              {"Додати посилання"}
            </SecondaryButton>
            <div className="mt-2">
              {items.length > 0 ? (
                <ul role="list" className="divide-y divide-gray-200">
                  {items.map((item, itemIndex) => (
                    <CompanyLink
                      key={itemIndex}
                      itemIndex={itemIndex}
                      item={item}
                      actionHandler={dispatch}
                    />
                  ))}
                </ul>
              ) : (
                <NoItems status="default" text="Посилань не додано" />
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <PrimaryButton type="submit" disabled={!wasChanged}>
            {isLoading ? (
              <LoadingSpinner className="text-white h-5 w-5" />
            ) : (
              "Зберегти"
            )}
          </PrimaryButton>
        </div>
      </form>
    </>
  );
}
