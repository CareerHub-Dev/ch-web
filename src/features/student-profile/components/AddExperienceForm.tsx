import { useWorkExperienceInputs } from "@/features/work-experience/hooks/use-work-experience-inputs";
import WorkExperienceForm from "@/features/work-experience/components/WorkExperienceForm";
import DialogActionButtons from "@/components/ui/dialog/DialogActionButtons";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import { addStudentWorkExperience } from "@/lib/api/student";
import useToast from "@/hooks/useToast";
import parseUnknownError from "@/lib/parse-unknown-error";
import { useQueryClient } from "@tanstack/react-query";

export default function AddExperienceForm({
    onCancel,
    onSuccess,
}: {
    onSuccess: () => void;
    onCancel: () => void;
}) {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useProtectedMutation(
        ["add-experience"],
        addStudentWorkExperience,
        {
            onSuccess() {
                toast.success("Досвід успішно додано");
                queryClient.invalidateQueries(["student-experiences", "self"]);
                onSuccess();
            },
            onError(err) {
                toast.error("Помилка: " + parseUnknownError(err));
            },
        }
    );
    const workExperienceInputs = useWorkExperienceInputs();
    const {
        thereAreSomeBlurredErrors,
        thereAreSomeInvalidInputs,
        blurAll,
        values,
    } = workExperienceInputs;

    const handleConfirm = () => {
        if (thereAreSomeInvalidInputs) {
            blurAll();
            return;
        }
        mutate(values);
    };

    return (
        <>
            <WorkExperienceForm {...workExperienceInputs} />
            <DialogActionButtons
                onConfirm={handleConfirm}
                onCancel={onCancel}
                confirmationDisabled={thereAreSomeBlurredErrors || isLoading}
                cancelText={"Відміна"}
                confirmText={"Додати"}
                isLoading={isLoading}
            />
        </>
    );
}
