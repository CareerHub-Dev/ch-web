import { useState } from 'react';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useInput from '../../../hooks/useInput';
import { addWorkingExperience } from '../../../context/cv-constructor';

import FormInput from '@/components/ui/form/FormInput';
import FormSelect from '@/components/ui/form/FormSelect';
import FormCheckbox from '@/components/ui/form/FormCheckbox';

import cn from 'classnames';
import stageClasses from './Stage.module.scss';
import classes from './AddWorkingExperienceForm.module.scss';

const valueIsNotEmpty = (value: string | null) =>
  value !== null && value.trim() !== '';

const monthOptions = [
  { value: '1', text: 'Січень' },
  { value: '2', text: 'Лютий' },
  { value: '3', text: 'Березень' },
  { value: '4', text: 'Квітень' },
  { value: '5', text: 'Травень' },
  { value: '6', text: 'Червень' },
  { value: '7', text: 'Липень' },
  { value: '8', text: 'Серпень' },
  { value: '9', text: 'Вересень' },
  { value: '10', text: 'Жовтень' },
  { value: '11', text: 'Листопад' },
  { value: '12', text: 'Грудень' },
];

const employmentTypeOptions = [
  { value: 'full-time', text: 'Повний' },
  { value: 'part-time', text: 'Неповний' },
  { value: 'freelance', text: 'Фріланс' },
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

const AddWorkingExperienceForm: React.FC<{ onSubmit: () => any }> = ({
  onSubmit,
}) => {
  const [isRemote, setIsRemote] = useState(false);
  const [jobIsCurrent, setJobIsCurrent] = useState(true);
  const company = useInput();
  const jobTitle = useInput();
  const employmentType = useInput();
  const jobLocation = useInput((value) => isRemote || valueIsNotEmpty(value));
  const startMonth = useInput();
  const startYear = useInput();
  const endMonth = useInput((value) => jobIsCurrent || valueIsNotEmpty(value));
  const endYear = useInput((value) => jobIsCurrent || valueIsNotEmpty(value));

  const dispatch = useAppDispatch();

  const isRemoteChangeHandler = () => {
    if (!isRemote) {
    }
    setIsRemote((prevState) => !prevState);
    jobLocation.reset();
  };

  const jobIsCurrentChangeHandler = () => {
    setJobIsCurrent((prevState) => !prevState);
    endMonth.reset();
    endYear.reset();
  };

  const formSubmissionHandler = (event: any) => {
    event.preventDefault();
    const inputs = [
      company,
      jobTitle,
      employmentType,
      jobLocation,
      startMonth,
      startYear,
      endMonth,
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
      addWorkingExperience({
        company: company.value,
        jobTitle: jobTitle.value,
        employmentType: employmentType.value,
        jobLocation: jobLocation.value,
        startMonth: startMonth.value,
        startYear: startYear.value,
        endMonth: endMonth.value,
        endYear: endYear.value,
        isRemote: isRemote,
        jobIsCurrent: jobIsCurrent,
      })
    );
    onSubmit();
  };

  return (
    <div className={cn(stageClasses['modal-medium'], stageClasses.body)}>
      <div className={classes['row-wrapper-space-between']}>
        <div className={classes['col-wrapper']}>
          <FormInput id="jobTitle" label="Посада" input={jobTitle} />
        </div>
        <div className={classes['col-wrapper']}>
          <FormInput id="company" label="Компанія" input={company} />
        </div>
      </div>
      <div className={classes['row-wrapper-space-between']}>
        <FormCheckbox
          id="isRemote"
          label="Дистанційно"
          checked={isRemote}
          onToggle={isRemoteChangeHandler}
        />
        <div className={classes['col-wrapper']}>
          <FormInput
            id="jobLocation"
            label="Місто (Країна)"
            disabled={isRemote}
            input={jobLocation}
          />
        </div>
      </div>
      <div className={classes['row-wrapper-space-between']}>
        <div className={classes['col-wrapper']}>
          <FormSelect
            id="startMonth"
            label="Місяць початку"
            options={monthOptions}
            selectionState={startMonth}
          />
        </div>
        <div className={classes['col-wrapper']}>
          <FormSelect
            id="startYear"
            label="Рік початку"
            options={getYearOptions(maxAllowedYearRange)}
            selectionState={startYear}
          />
        </div>
      </div>
      <div className={classes['row-wrapper-space-between']}>
        <FormCheckbox
          id="jobIsCurrent"
          label="Досі працюю"
          checked={jobIsCurrent}
          onToggle={jobIsCurrentChangeHandler}
        />
        <div className={classes['col-wrapper']}>
          <FormSelect
            id="employmentType"
            label="Вид зайнятості"
            selectionState={employmentType}
            options={employmentTypeOptions}
          />
        </div>
      </div>
      <div className={classes['row-wrapper-space-between']}>
        <div className={classes['col-wrapper']}>
          <FormSelect
            id="endMonth"
            label="Місяць закінчення "
            disabled={jobIsCurrent}
            options={monthOptions}
            selectionState={endMonth}
          />
        </div>
        <div className={classes['col-wrapper']}>
          <FormSelect
            id="endYear"
            label="Рік закінчення "
            disabled={jobIsCurrent}
            options={getYearOptions(maxAllowedYearRange)}
            selectionState={endYear}
          />
        </div>
      </div>

      <button className={stageClasses.button} onClick={formSubmissionHandler}>
        Підтвердити
      </button>
    </div>
  );
};

export default AddWorkingExperienceForm;
