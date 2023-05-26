import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";

export default function RemovePhotoModal({
    show,
    isLoading = false,
    onClose,
    onConfirm,
}: {
    show: boolean;
    isLoading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
}) {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <DialogWithBackdrop title={"Видалити"} onClose={onClose} show={show}>
            <p className="text-center">
                {"Ви точно хочете видалити фотографію?"}
            </p>
            <DialogActionButtons
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                cancelText={"Відміна"}
                isLoading={isLoading}
                confirmText={"Видалити"}
                confirmColor="red"
            />
        </DialogWithBackdrop>
    );
}
