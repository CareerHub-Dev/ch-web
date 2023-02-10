import { useCvDataStore } from '@/context/cv-data-store';
import { type Education } from '@/context/cv-data-store/cv';
import { useInput } from '@/hooks/useInput';
import { useObjectInput } from '@/hooks/useObjectInput';
import { useMemo } from 'react';
import { useBoolean } from 'usehooks-ts';
import NativeItemSelection from '../ui/NativeItemSelection';
import { ValidatedInput } from '../ui/ValidatedInput';
import AddOrEditItemModal from './item-list/AddOrEditItemModal';

export default function AddOrEditEducationModal({
  onClose,
  initialPayload,
}: {
  onClose: () => void;
  initialPayload?: { item: Education; itemIndex: number };
}) {
  const dispatchEducations = useCvDataStore((s) => s.dispatchEducations);
  const yearOptions = useMemo(() => getYearOptions(MAX_ALLOWED_YEAR_RANGE), []);
  const educationIsCurrent = useBoolean(true);
  const university = useInput({
    initialValue: initialPayload?.item.university ?? '',
    validators: [fillThisFieldValidator],
  });
  const country = useInput({
    initialValue: initialPayload?.item.country ?? '',
    validators: [fillThisFieldValidator],
  });
  const city = useInput({
    initialValue: initialPayload?.item.city ?? '',
    validators: [fillThisFieldValidator],
  });
  const speciality = useInput({
    initialValue: initialPayload?.item.speciality ?? '',
    validators: [fillThisFieldValidator],
  });
  const degree = useObjectInput({
    initialValue:
      DEGREE_OPTIONS.find((item) => item.id === initialPayload?.item.degree) ??
      DEGREE_OPTIONS.at(0)!,
  });
  const startYear = useObjectInput({
    initialValue:
      yearOptions.find((item) => item.id === initialPayload?.item.startYear) ??
      yearOptions.at(0)!,
  });
  const endYear = useObjectInput({
    initialValue:
      yearOptions.find((item) => item.id === initialPayload?.item.endYear) ??
      yearOptions.at(0)!,
    validators: [
      (val) =>
        !educationIsCurrent && Number(val.name) <= Number(startYear.value.name)
          ? {
              type: 'error',
              message: 'Перевірте коретність обраних років',
            }
          : { type: 'success' },
    ],
  });

  const allInputs = [
    university,
    country,
    city,
    speciality,
    degree,
    startYear,
    endYear,
  ];
  const thereAreSomeErrors = allInputs.some((item) => item.errors.length > 0);

  const formType = !initialPayload ? 'add' : 'edit';

  const handleConfirm = () => {
    const values = {
      university: university.value,
      country: country.value,
      city: city.value,
      speciality: speciality.value,
      degree: degree.value.id,
      startYear: startYear.value.id,
      endYear: endYear.value.id,
    };

    if (!initialPayload) {
      dispatchEducations({
        type: 'add',
        item: values,
      });
    } else {
      dispatchEducations({
        type: 'edit',
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
            label="Університет"
            id="university"
            value={university.value}
            onChange={university.change}
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
            warnings={city.warnings}
            errors={city.errors}
            wasBlurred={city.wasBlurred}
            wasChanged={city.wasChanged}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <ValidatedInput
            label="Спеціальність"
            id="speciality"
            value={speciality.value}
            onChange={speciality.change}
            warnings={speciality.warnings}
            errors={speciality.errors}
            wasBlurred={speciality.wasBlurred}
            wasChanged={speciality.wasChanged}
          />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <NativeItemSelection
            id="degree"
            label="Степінь"
            items={DEGREE_OPTIONS}
            selectedItem={degree.value}
            setSelected={degree.change}
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
      </div>
    </AddOrEditItemModal>
  );
}

const DEGREE_OPTIONS = [
  { id: 'bachelor', name: 'Бакалавр' },
  { id: 'master', name: 'Магістр ' },
  { id: 'phd', name: 'Ph.D' },
];

const getYearOptions = (range: number) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(Array(range).keys()).map((item) => {
    const year = (currentYear - item).toString();
    return {
      id: year,
      name: year,
    };
  });
  return yearOptions;
};

const fillThisFieldValidator: Inputs.Validator<string> = (val: string) =>
  val.length > 0
    ? { type: 'success' }
    : {
        type: 'error',
        message: "Це обов'язкове поле",
      };

const MAX_ALLOWED_YEAR_RANGE = 50;
