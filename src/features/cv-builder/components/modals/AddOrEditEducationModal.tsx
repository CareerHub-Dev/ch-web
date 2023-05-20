import { useCvDataStore } from "../../store/cv-data-store";
import { Education } from "../../store/cv-data-store/cv";
import { useInput } from "@/hooks/useInput";
import { useObjectInput } from "@/hooks/useObjectInput";
import { useState, useMemo } from "react";
import { useBoolean } from "usehooks-ts";
import NativeItemSelection from "@/components/ui/NativeItemSelection";
import ValidatedInput from "@/components/ui/ValidatedInput";
import AddOrEditItemModal from "./AddOrEditItemModal";

export default function AddOrEditEducationModal({
    onClose,
    initialPayload,
}: {
    onClose: () => void;
    initialPayload?: { item: Education; itemIndex: number };
}) {
    const dispatchEducations = useCvDataStore((s) => s.dispatchEducations);
    const cvTemplateLanguage = useCvDataStore((s) => s.cvData.templateLanguage);
    const yearOptions = useMemo(
        () => getYearOptions(MAX_ALLOWED_YEAR_RANGE),
        []
    );
    const educationIsCurrent = useBoolean(true);
    const university = useInput({
        initialValue: initialPayload?.item.university ?? "",
        validators: [fillThisFieldValidator],
    });
    const country = useInput({
        initialValue: initialPayload?.item.country ?? "",
        validators: [fillThisFieldValidator],
    });
    const city = useInput({
        initialValue: initialPayload?.item.city ?? "",
        validators: [fillThisFieldValidator],
    });
    const speciality = useInput({
        initialValue: initialPayload?.item.speciality ?? "",
        validators: [fillThisFieldValidator],
    });
    const [degree, setDegree] = useState(
        DEGREE_OPTIONS.find(
            (item) => item.id === initialPayload?.item.degree
        ) || DEGREE_OPTIONS.at(0)!
    );
    const startYear = useObjectInput({
        initialValue:
            yearOptions.find(
                (item) => item.id === initialPayload?.item.startYear
            ) ?? yearOptions.at(0)!,
    });
    const endYear = useObjectInput({
        initialValue:
            yearOptions.find(
                (item) => item.id === initialPayload?.item.endYear
            ) ?? yearOptions.at(0)!,
    });
    const startYearInt = Number(startYear.value.name);
    const endYearInt = Number(endYear.value.name);
    const currentYear = new Date().getFullYear();
    const timePeriodIsInvalid =
        !educationIsCurrent.value &&
        (startYearInt > endYearInt || startYearInt > currentYear);
    const allInputs = [
        university,
        country,
        city,
        speciality,
        startYear,
        endYear,
    ];
    const thereAreSomeErrors =
        allInputs.some((item) => item.errors.length > 0) || timePeriodIsInvalid;

    const formType = !initialPayload ? "add" : "edit";
    const placeholders = mapPlaceholders(cvTemplateLanguage.id);

    const handleConfirm = () => {
        const values = {
            university: university.value,
            country: country.value,
            city: city.value,
            speciality: speciality.value,
            degree: degree.id,
            startYear: startYear.value.id,
            endYear: endYear.value.id,
            isCurrent: educationIsCurrent.value,
        };

        if (!initialPayload) {
            dispatchEducations({
                type: "add",
                item: values,
            });
        } else {
            dispatchEducations({
                type: "edit",
                itemIndex: initialPayload.itemIndex,
                newValue: values,
            });
        }
        onClose();
    };

    return (
        <AddOrEditItemModal
            onClose={onClose}
            onConfirm={handleConfirm}
            type={formType}
            confirmationDisabled={thereAreSomeErrors}
        >
            <div className="grid grid-cols-6 gap-6 mt-4">
                <div className="col-span-6 sm:col-span-6">
                    <ValidatedInput
                        label="Університет, повна назва"
                        id="university"
                        value={university.value}
                        placeholder={placeholders.university}
                        onChange={university.change}
                        onBlur={university.blur}
                        warnings={university.warnings}
                        errors={university.errors}
                        wasBlurred={university.wasBlurred}
                        wasChanged={university.wasChanged}
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <ValidatedInput
                        label="Країна"
                        id="country"
                        value={country.value}
                        onChange={country.change}
                        onBlur={country.blur}
                        placeholder={placeholders.country}
                        warnings={country.warnings}
                        errors={country.errors}
                        wasBlurred={country.wasBlurred}
                        wasChanged={country.wasChanged}
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <ValidatedInput
                        label="Місто"
                        id="city"
                        value={city.value}
                        onChange={city.change}
                        placeholder={placeholders.city}
                        onBlur={city.blur}
                        warnings={city.warnings}
                        errors={city.errors}
                        wasBlurred={city.wasBlurred}
                        wasChanged={city.wasChanged}
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <ValidatedInput
                        label="Спеціальність, повна назва"
                        id="speciality"
                        value={speciality.value}
                        onChange={speciality.change}
                        placeholder={placeholders.speciality}
                        onBlur={speciality.blur}
                        warnings={speciality.warnings}
                        errors={speciality.errors}
                        wasBlurred={speciality.wasBlurred}
                        wasChanged={speciality.wasChanged}
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <NativeItemSelection
                        id="degree"
                        label="Ступінь"
                        items={DEGREE_OPTIONS}
                        selectedItem={degree}
                        setSelected={setDegree}
                    />
                </div>

                <div className="col-span-6 sm:col-span-6">
                    <div className="flex h-5 items-center">
                        <input
                            id="isCurrent"
                            aria-describedby="isCurrentEducation"
                            name="isCurrent"
                            type="checkbox"
                            checked={educationIsCurrent.value}
                            onChange={educationIsCurrent.toggle}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="isCurrent"
                            className="ml-3 text-sm font-medium text-gray-700"
                        >
                            Це моє поточне навчання
                        </label>
                    </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <NativeItemSelection
                        id="startYear"
                        label="Рік початку"
                        items={yearOptions}
                        selectedItem={startYear.value}
                        setSelected={startYear.change}
                    />
                </div>
                <div className="col-span-6 sm:col-span-3">
                    <NativeItemSelection
                        id="endYear"
                        label="Рік закінчення"
                        items={yearOptions}
                        selectedItem={endYear.value}
                        setSelected={endYear.change}
                        disabled={educationIsCurrent.value}
                    />
                </div>
                {timePeriodIsInvalid ? (
                    <p className="col-span-6 text-sm text-red-600">
                        {"Невалідний проміжок часу"}
                    </p>
                ) : null}
            </div>
        </AddOrEditItemModal>
    );
}

const DEGREE_OPTIONS = [
    { id: "Bachelor", name: "Бакалавр" },
    { id: "Specialist", name: "Спеціаліст" },
    { id: "Master", name: "Магістр " },
    { id: "Ph.D", name: "Ph.D" },
];

function getYearOptions(range: number) {
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from(Array(range).keys()).map((item) => {
        const year = (currentYear - item).toString();
        return {
            id: year,
            name: year,
        };
    });
    return yearOptions;
}

function fillThisFieldValidator(val: string) {
    return val.length > 0
        ? ({ type: "success" } as const)
        : ({
              type: "error",
              message: "Це обов'язкове поле",
          } as const);
}
function mapPlaceholders(localeId: string) {
    switch (localeId.toLowerCase()) {
        case "ua":
            return {
                university:
                    "Харківський національний університет радіоелектроніки",
                country: "Україна",
                city: "Харків",
                speciality: "Інформаційні системи та технології",
            };
        case "en":
            return {
                university: "Kharkiv National University of Radioelectronics",
                country: "Ukraine",
                city: "Kharkiv",
                speciality: "Information Systems and Technologies",
            };
        default:
            return {
                university: "Kharkiv National University of Radioelectronics",
                country: "Ukraine",
                city: "Kharkiv",
                speciality: "Information Systems and Technologies",
            };
    }
}
const MAX_ALLOWED_YEAR_RANGE = 50;
