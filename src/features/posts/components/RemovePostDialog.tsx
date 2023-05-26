import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";
import { useRemovePostMutation } from "../hooks/use-remove-post-mutation";
import { limitText } from "@/lib/util";

export default function RemovePostDialog({
    postId,    
    postText,
    show,
    onClose,
}: {
    postId: string;
    postText: string;
    show: boolean;
    onClose: () => void;
}) {
    const limitedText = limitText(postText, 20);
    const { mutateAsync, isLoading } = useRemovePostMutation();
    const handleConfirm = async () => {
        await mutateAsync(postId);
        onClose();
    };
    return (
        <DialogWithBackdrop
            title="Видалити публікацію?"
            show={show}
            panelSize="md"
            onClose={onClose}
        >
            <div className="text-sm text-gray-500">
                {"Ви впевнені, що хочете видалити публікацію "}
                <span className="font-semibold">{limitedText}</span>
                {"?"}
            </div>
            <DialogActionButtons
                isLoading={isLoading}
                onConfirm={handleConfirm}
                confirmColor="red"
                onCancel={onClose}
            />
        </DialogWithBackdrop>
    );
}
