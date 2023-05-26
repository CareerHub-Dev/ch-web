import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import { useAddPostMutation } from "../hooks/use-add-post-mutation";
import { useInput } from "@/hooks/useInput";
import { fillThisFieldValidator } from "@/lib/util";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ValidatedTextArea from "@/components/ui/ValidatedTextArea";

const validators = [fillThisFieldValidator("Це поле є обов'язковим")];

export default function AddPostForm({
    onClose,
    show,
}: {
    onClose: () => void;
    show: boolean;
}) {
    const { mutate, isLoading } = useAddPostMutation();
    const textInput = useInput({
        validators,
    });
    const cannotSave = isLoading || !textInput.isValid;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({
            text: textInput.value,
            images: [],
        });
        textInput.reset();
    };

    return (
        <DialogWithBackdrop
            show={show}
            onClose={onClose}
            panelSize="md"
            title="Додати публікацію"
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
                        {"Додати"}
                    </PrimaryButton>
                </div>
            </form>
        </DialogWithBackdrop>
    );
}
