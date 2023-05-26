import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import { useAddOrEditPostMutation } from "../hooks/use-add-post-mutation";
import { useInput } from "@/hooks/useInput";
import { fillThisFieldValidator } from "@/lib/util";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ValidatedTextArea from "@/components/ui/ValidatedTextArea";

const validators = [fillThisFieldValidator("Це поле є обов'язковим")];

export default function AddOrEditPostForm({
    initialPayload,
    onClose,
    show,
}: {
    onClose: () => void;
    show: boolean;
    initialPayload?: { id: string; text: string; images: string[] };
}) {
    const { mutateAsync, isLoading } = useAddOrEditPostMutation(initialPayload);
    const textInput = useInput({
        validators,
        initialValue: initialPayload?.text ?? "",
    });

    const dialogTitle = initialPayload ? "Редагувати" : "Додати";
    const confirmText = initialPayload ? "Зберегти" : "Додати";
    const cannotSave = isLoading || !textInput.isValid;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await mutateAsync({
            text: textInput.value,
            images: [],
        });
        textInput.reset();
        onClose();
    };

    return (
        <DialogWithBackdrop
            show={show}
            onClose={onClose}
            panelSize="md"
            title={dialogTitle}
        >
            <form onSubmit={handleSubmit}>
                <ValidatedTextArea
                    id="text"
                    value={textInput.value}
                    onChange={textInput.change}
                    wasBlurred={textInput.wasBlurred}
                    wasChanged={textInput.wasChanged}
                    errors={textInput.errors}
                    warnings={textInput.warnings}
                    onBlur={textInput.blur}
                />
                <div className="flex justify-end mt-8 border-t-gray-300">
                    <PrimaryButton type="submit" disabled={cannotSave}>
                        {confirmText}
                    </PrimaryButton>
                </div>
            </form>
        </DialogWithBackdrop>
    );
}
