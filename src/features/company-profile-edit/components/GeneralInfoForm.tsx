import ValidatedInput from "@/components/ui/ValidatedInput";
import ValidatedTextArea from "@/components/ui/ValidatedTextArea";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import useToast from "@/hooks/useToast";
import { useInput } from "@/hooks/useInput";
import { editCompanyDetail } from "@/lib/api/company";
import { fillThisFieldValidator } from "@/lib/util";
import parseUnknownError from "@/lib/parse-unknown-error";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import SecondaryButton from "@/components/ui/SecondaryButton";
import PrimaryButton from "@/components/ui/PrimaryButton";

const validators = [fillThisFieldValidator("Це поле обов'язкове")];

export default function GeneralInfoForm({
    name,
    motto,
    description,
}: {
    name: string;
    motto: string;
    description: string;
}) {
    const nameInput = useInput({ initialValue: name, validators });
    const mottoInput = useInput({ initialValue: motto, validators });
    const descriptionInput = useInput({
        initialValue: description,
        validators,
    });
    const toast = useToast();
    const { mutate, isLoading } = useProtectedMutation(
        ["edit-detail"],
        editCompanyDetail,
        {
            onSuccess: () => {
                toast.success("Зміни збережено");
            },
            onError: (error) => {
                toast.error(parseUnknownError(error));
            },
        }
    );

    const wasChanged =
        nameInput.wasChanged ||
        mottoInput.wasChanged ||
        descriptionInput.wasChanged;
    const hasInvalidInputs =
        !nameInput.isValid || !mottoInput.isValid || !descriptionInput.isValid;
    const cannotSave = !wasChanged || hasInvalidInputs || isLoading;

    const handleCancelClick = () => {
        nameInput.reset({ value: name, wasBlurred: false, wasChanged: false });
        mottoInput.reset({
            value: motto,
            wasBlurred: false,
            wasChanged: false,
        });
        descriptionInput.reset({
            value: description,
            wasBlurred: false,
            wasChanged: false,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        nameInput.blur();
        mottoInput.blur();
        descriptionInput.blur();

        if (cannotSave) {
            return;
        }

        mutate({
            name: nameInput.value,
            motto: mottoInput.value,
            description: descriptionInput.value,
        });
    };

    return (
        <>
            <div>
                <h2 className="text-base font-semibold leading-7 text-black">
                    {"Загальна інформація"}
                </h2>
            </div>

            <form className="md:col-span-2" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label
                            htmlFor="company-name"
                            className="block text-sm font-medium leading-6"
                        >
                            {"Назва компанії"}
                        </label>
                        <div className="mt-2">
                            <ValidatedInput
                                id="company-name"
                                value={nameInput.value}
                                onChange={nameInput.change}
                                onBlur={nameInput.blur}
                                wasChanged={nameInput.wasChanged}
                                wasBlurred={nameInput.wasBlurred}
                                errors={nameInput.errors}
                                warnings={nameInput.warnings}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label
                            htmlFor="company-motto"
                            className="block text-sm font-medium leading-6"
                        >
                            {"Девіз компанії"}
                        </label>
                        <div className="mt-2">
                            <ValidatedInput
                                id="company-motto"
                                value={mottoInput.value}
                                onChange={mottoInput.change}
                                onBlur={mottoInput.blur}
                                wasChanged={mottoInput.wasChanged}
                                wasBlurred={mottoInput.wasBlurred}
                                errors={mottoInput.errors}
                                warnings={mottoInput.warnings}
                            />
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium leading-6"
                        >
                            {"Опис"}
                        </label>
                        <div className="mt-2">
                            <ValidatedTextArea
                                id="description"
                                value={descriptionInput.value}
                                onChange={descriptionInput.change}
                                onBlur={descriptionInput.blur}
                                wasChanged={descriptionInput.wasChanged}
                                wasBlurred={descriptionInput.wasBlurred}
                                errors={descriptionInput.errors}
                                warnings={descriptionInput.warnings}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <PrimaryButton type="submit" disabled={cannotSave}>
                        {isLoading ? (
                            <LoadingSpinner className="text-white h-5 w-5" />
                        ) : (
                            "Зберегти"
                        )}
                    </PrimaryButton>

                    <SecondaryButton type="button" onClick={handleCancelClick}>
                        {"Відмінити"}
                    </SecondaryButton>
                </div>
            </form>
        </>
    );
}
