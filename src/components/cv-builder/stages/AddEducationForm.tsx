import { useState } from 'react';
import useAppDispatch from '@/hooks/useAppDispatch';
import useInput from '@/hooks/useInput';
import { addEducation } from '@/context/cv-constructor';
import FormInput from '@/components/ui/form/FormInput';
import FormSelect from '@/components/ui/form/FormSelect';
import FormCheckbox from '@/components/ui/form/FormCheckbox';

import cn from 'classnames';
import classes from './Stage.module.scss';

const degreeOptions = [
  { value: 'bachelor', text: 'Бакалавр' },
  { value: 'master', text: 'Магістр ' },
  { value: 'phd', text: 'Ph.D' },
];

const getYearOptions = (range: number) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(Array(range).keys()).map((item) => {
    const year = (currentYear - item).toString();
    return {
      value: year,
      text: year,
    };
  });
  return yearOptions;
};

const maxAllowedYearRange = 50;

const AddEducationForm: React.FC<{
  onSubmit: (...params: Array<any>) => any;
}> = ({ onSubmit }) => {
  const [educationIsCurrent, setEducationIsCurrent] = useState(true);
  const university = useInput();
  const country = useInput();
  const city = useInput();
  const title = useInput();
  const degree = useInput();
  const startYear = useInput();
  const endYear = useInput(
    (value) => educationIsCurrent || value.trim().length !== 0
  );

  const dispatch = useAppDispatch();

  const educationIsCurrentToggleHandler = () => {
    setEducationIsCurrent((prevState) => !prevState);
  };

  const formSubmissionHandler = (event: any) => {
    event.preventDefault();
    const inputs = [
      university,
      country,
      city,
      title,
      degree,
      startYear,
      endYear,
    ];

    const allInputsAreValid = inputs.every((item) => item.isValid);
    if (!allInputsAreValid) {
      inputs.forEach((item) => {
        item.inputBlurHandler();
      });
      return;
    }
    dispatch(
      addEducation({
        university: university.value,
        country: country.value,
        city: city.value,
        title: title.value,
        degree: degree.value,
        startYear: startYear.value,
        endYear: endYear.value,
        educationIsCurrent: educationIsCurrent,
      })
    );
    onSubmit();
  };

  return (
    <div className={cn(classes['modal-default'], classes.body)}>
      <FormInput id="university" input={university} label="Університет:" />
      <FormInput id="country" input={country} label="Країна:" />
      <FormInput id="city" input={city} label="Місто:" />
      <FormInput id="title" input={title} label="Спеціальність:" />
      <FormSelect
        id="degree"
        label="Ступінь:"
        selectionState={degree}
        options={degreeOptions}
      />
      <FormCheckbox
        id="educationIsCurrent"
        label="Це моє поточне навчання "
        checked={educationIsCurrent}
        onToggle={educationIsCurrentToggleHandler}
      />
      <FormSelect
        id="startYear"
        selectionState={startYear}
        label="Рік початку"
        options={getYearOptions(maxAllowedYearRange)}
      />
      <FormSelect
        id="endYear"
        selectionState={endYear}
        label="Рік закінчення"
        disabled={educationIsCurrent}
        options={getYearOptions(maxAllowedYearRange)}
      />
      <button className={classes.button} onClick={formSubmissionHandler}>
        Підтвердити
      </button>
    </div>
  );
};

export default AddEducationForm;
