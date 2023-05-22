import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import DialogWithBackdrop from "@/components/ui/dialog/DialogWithBackdrop";

export default function RemovePhotoModal({
    show,
    onClose,
    onConfirm,
}: {
    show: boolean;
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
                confirmText={"Видалити"}
                confirmClasses="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 text-base"
            />
        </DialogWithBackdrop>
    );
}
