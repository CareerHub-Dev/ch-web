import useToast from "@/hooks/useToast";
import useEditor from "@/hooks/useEditor";
import { useInput } from "@/hooks/useInput";
import useProtectedMutation from "@/hooks/useProtectedMutation";
import { createJobOffer } from "@/lib/api/job-offer";
import parseUnknownError from "@/lib/parse-unknown-error";
import { FormEventHandler } from "react";

const defaultMessage = "Це обов'язкове поле";

export default function JobOfferForm() {
    const toast = useToast();
    const titleInput = useInput({
        validators: [
            (value) =>
                value.trim().length > 0
                    ? { type: "success" }
                    : {
                          type: "error",
                          message: "Заповніть це поле",
                      },
        ],
    });
    const overviewEditor = useEditor();
    const requirementsEditor = useEditor();
    const responsibilitiesEditor = useEditor();

    const submitMutation = useProtectedMutation(
        ["job-offer-form"],
        createJobOffer,
        {
            onMutate: () => {
                toast.setCurrent("Створення вакансії...");
            },
            onError: (err) => {
                toast.error(parseUnknownError(err), true);
            },
            onSuccess: () => {
                toast.success(
                    `\u2713 Вакансію ${titleInput.value} створено`,
                    true
                );
            },
        }
    );

    const editors = [
        {
            id: "overview",
            label: "Огляд",
            validationMessage: defaultMessage,
            ...overviewEditor,
        },
        {
            id: "requirements",
            label: "Вимоги",
            validationMessage: defaultMessage,
            ...requirementsEditor,
        },
        {
            id: "responsibilities",
            label: "Обов'язки",
            validationMessage: defaultMessage,
            ...responsibilitiesEditor,
        },
    ];

    const formIsValid =
        titleInput.isValid &&
        overviewEditor.isValid &&
        requirementsEditor.isValid &&
        responsibilitiesEditor.isValid;

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        titleInput.blur();
        overviewEditor.blur();
        requirementsEditor.blur();
        responsibilitiesEditor.blur();

        if (!formIsValid) {
            return;
        }

        const requestBody = {} as JobOfferForm.JobOffer;

        submitMutation.mutate(requestBody);
    };

    return (
        <form className="p-8" onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        {"Додання вакансії"}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        {
                            "Після відправки цієї форми вакансію буде опбліковано, але ви зможете її редагувати."
                        }
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {"Назва вакансії"}
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Trainee Python Developer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
