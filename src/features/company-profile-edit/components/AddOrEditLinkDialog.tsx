import { useInput } from "@/hooks/useInput";
import { CompanyLink } from "./CompanyLink";
import ValidatedInput from "@/components/ui/ValidatedInput";
import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";

export default function AddOrEditLinkDialog({
  onAddItem,
  onEditItem,
  onClose,
  initialPayload,
  show,
}: {
  onClose: () => void;
  onAddItem: (item: CompanyLink) => void;
  onEditItem: (item: CompanyLink, itemIndex: number) => void;
  initialPayload?: { item: CompanyLink; itemIndex: number };
  show: boolean;
}) {
  const titleInput = useInput({
    initialValue: initialPayload?.item.title || "",
    validators: [
      (val) => {
        return val.length > 0
          ? { type: "success" }
          : {
              type: "error",
              message: "Назва посилання має містити хоча б один символ",
            };
      },
    ],
  });
  const urlInput = useInput({
    initialValue: initialPayload?.item.uri || "",
    validators: [
      (val) =>
        val.length > 0
          ? { type: "success" }
          : {
              type: "error",
              message: "Адреса має містити хоча б один символ",
            },
      (val) =>
        val.startsWith("http://") || val.startsWith("https://")
          ? {
              type: "success",
            }
          : {
              type: "warning",
              message:
                "Краще почати посилання з протоколу (`http://` або `https://`)",
            },
    ],
  });
  const handleConfirm = () => {
    const values = {
      title: titleInput.value,
      uri: urlInput.value,
    };

    if (initialPayload === undefined) {
      onAddItem(values);
    } else {
      onEditItem(values, initialPayload.itemIndex);
    }
    onClose();
    titleInput.reset();
    urlInput.reset();
  };
  const dialogTitle = initialPayload === undefined ? "Додати" : "Редагувати";
  const confirmText = initialPayload === undefined ? "Додати" : "Зберегти";

  return (
    <DialogWithBackdrop show={show} onClose={onClose} title={dialogTitle}>
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <ValidatedInput
            id="title"
            value={titleInput.value}
            onChange={titleInput.change}
            onBlur={titleInput.blur}
            errors={titleInput.errors}
            warnings={titleInput.warnings}
            wasChanged={titleInput.wasChanged}
            wasBlurred={titleInput.wasBlurred}
            label="Назва"
          />
        </div>
        <div>
          <ValidatedInput
            id="url"
            value={urlInput.value}
            onChange={urlInput.change}
            onBlur={urlInput.blur}
            errors={urlInput.errors}
            warnings={urlInput.warnings}
            wasChanged={urlInput.wasChanged}
            wasBlurred={urlInput.wasBlurred}
            label="Адреса"
          />
        </div>
      </div>
      <DialogActionButtons
        onConfirm={handleConfirm}
        onCancel={onClose}
        confirmText={confirmText}
      />
    </DialogWithBackdrop>
  );
}
