import useSession from "@/hooks/useSession";
import useToast from "@/hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import useEditor from "@/hooks/useEditor";
import { useInput } from "@/hooks/useInput";
import useImageUpload from "@/hooks/useImageUpload";
import useDatepicker from "@/hooks/useDatepicker";
import { createJobOffer } from "@/lib/api/remote/jobOffers";
import {
    JobType,
    WorkFormat,
    ExperienceLevel,
    jobTypeOptions,
    workFormatOptions,
    experienceLevelOptions,
} from "@/lib/enums";

import LoadedImage from "@/components/ui/LoadedImage";
import EditorsList from "./EditorsList";
import DatePicker from "./DatePicker";
import LinkButton from "@/components/ui/LinkButton";
import Hr from "@/components/ui/Hr";
import cn from "classnames";

import classes from "./JobOfferForm.module.scss";

const maxDaysFrame = 60;
const defaultMessage = "Це обов'язкове поле";

const JobOfferForm = () => {
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
    const jobTypeInput = useInput({ initialValue: JobType.FullTime });
    const workFormatInput = useInput({ initialValue: WorkFormat.OnSite });
    const experienceLevelInput = useInput({
        initialValue: ExperienceLevel.Junior,
    });

    const uploadedImage = useImageUpload();
    const overviewEditor = useEditor();
    const requirementsEditor = useEditor();
    const responsibilitiesEditor = useEditor();
    const { startDate, endDate, dateFrameIsValid } =
        useDatepicker(maxDaysFrame);

    const { data: session } = useSession();
    const submitMutation = useMutation(["job-offer-form"], createJobOffer, {
        onError: (error) => {
            let msg;
            if (error instanceof Error) {
                msg = error.message;
            } else {
                msg = "Не вдалося створити вакансію";
            }
            toast.error(msg, true);
        },
        onSuccess: () => {
            toast.success(`\u2713 Вакансію ${titleInput.value} створено`, true);
            titleInput.reset();
            uploadedImage.reset();
            overviewEditor.reset();
            requirementsEditor.reset();
            responsibilitiesEditor.reset();
            startDate.reset();
            endDate.reset();
        },
    });

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
        responsibilitiesEditor.isValid &&
        startDate.isValid &&
        endDate.isValid &&
        dateFrameIsValid;

    const formSubmissionHandler = (event: MouseEvent) => {
        event.preventDefault();
        titleInput.blur();
        overviewEditor.blur();
        requirementsEditor.blur();
        responsibilitiesEditor.blur();
        startDate.blur();
        endDate.blur();

        if (!formIsValid) {
            return;
        }
        toast.setCurrent("Створення вакансії...");

        const requestBody: JobOfferForm.JobOffer = {
            title: titleInput.value,
            overview: overviewEditor.toMarkdown(),
            requirements: requirementsEditor.toMarkdown(),
            responsibilities: responsibilitiesEditor.toMarkdown(),
            imageFile: uploadedImage.data,
            startDate: startDate.value.toISOString(),
            endDate: endDate.value.toISOString(),
            tagIds: [], // TODO: add tags input and conversion
            jobType: jobTypeInput.value,
            workFormat: workFormatInput.value,
            experienceLevel: experienceLevelInput.value,
            jobPositionId: "1", // TODO: add job position input and conversion
            preferences: "none", // TODO: add preferences input and conversion
        };

        submitMutation.mutate({
            data: requestBody,
            accessToken: session?.jwtToken as string,
        });
    };

    return (
        <form className="mx-32">
            <h1 className={classes["description-section-title"]}>
                {"Нова вакансія"}
            </h1>
            <Hr width="100%" />
            <div id="headInput" className="flex flex-col mt-2">
                <label htmlFor="titleInput">{"Назва"}</label>
                <input
                    id="titleInput"
                    className={cn(
                        classes.field,
                        titleInput.wasBlurred &&
                            titleInput.hasErrors &&
                            classes.invalid
                    )}
                    type="text"
                    placeholder="Введіть назву позиції"
                    onChange={(e) => titleInput.change(e.target.value)}
                    onBlur={titleInput.blur}
                ></input>
                {titleInput.wasBlurred && titleInput.hasErrors && (
                    <p
                        id="titleInputValidationMessage"
                        className={cn(classes.validation, "mb-4")}
                    >
                        {defaultMessage}
                    </p>
                )}

                <label htmlFor="jobTypeSelect">{"Тип вакансії"}</label>
                <select
                    id="jobTypeSelect"
                    onChange={(e) => jobTypeInput.change(e.target.value)}
                    value={jobTypeInput.value || ""}
                    className={classes.field}
                >
                    {jobTypeOptions.map((option, optionIndex) => (
                        <option key={optionIndex} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="workFormatSelect">{"Формат роботи"}</label>
                <select
                    id="workFormatSelect"
                    onChange={(e) => workFormatInput.change(e.target.value)}
                    value={workFormatInput.value || ""}
                    className={classes.field}
                >
                    {workFormatOptions.map((option, optionIndex) => (
                        <option key={optionIndex} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="experienceLevelSelect">
                    {"Рівень досвіду"}
                </label>
                <select
                    id="experienceLevelSelect"
                    onChange={(e) =>
                        experienceLevelInput.change(e.target.value)
                    }
                    value={experienceLevelInput.value || ""}
                    className={classes.field}
                >
                    {experienceLevelOptions.map((option, optionIndex) => (
                        <option key={optionIndex} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>

                <div className="flex flex-col mb-5">
                    <DatePicker
                        startDate={startDate}
                        endDate={endDate}
                        maxDaysFrame={60}
                        dateFrameIsValid={dateFrameIsValid}
                    />
                </div>

                <label htmlFor="imageInput" className={classes["image-upload"]}>
                    <i className="fas fa-upload" />
                    {" Зображення (опціональне)"}
                </label>
                <input
                    id="imageInput"
                    className={classes.hidden}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={uploadedImage.onUpload}
                />
                {uploadedImage.data && (
                    <div id="previewWrapper">
                        <LoadedImage
                            data={uploadedImage.data}
                            alt="Job Offer icon preview"
                            width={200}
                            height={200}
                            className={classes["image-preview"]}
                        />
                        <button
                            className={classes["image-clear"]}
                            onClick={() => {
                                uploadedImage.reset();
                            }}
                        >
                            <i className="fas fa-ban" />
                            {" Видалити зображення"}
                        </button>
                    </div>
                )}
            </div>

            <EditorsList editors={editors} />

            <LinkButton
                onClick={formSubmissionHandler}
                disabled={submitMutation.isLoading}
            >
                {"Підтвердити"}
            </LinkButton>
        </form>
    );
};

export default JobOfferForm;
