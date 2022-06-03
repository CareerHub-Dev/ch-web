import FormInput from '@/components/ui/form/FormInput';
import FormSelect from '@/components/ui/form/FormSelect';

import cn from 'classnames';
import classes from './Stage.module.scss';

const proficiencyLevelOptions = [
  { value: 'A1', text: 'A1' },
  { value: 'A2', text: 'A2' },
  { value: 'B1', text: 'B1' },
  { value: 'B2', text: 'B2' },
  { value: 'C1', text: 'C1' },
  { value: 'C2', text: 'C2' },
];

const AddLanguageForm: React.FC<{
  onSubmit: (...params: Array<any>) => any;
  language: any;
  level: any;
}> = ({ onSubmit, language, level }) => {
  const formSubmissionHandler = (event: any) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className={cn(classes['modal-default'], classes.body)}>
      <FormInput id="language" input={language} label="Мова:" />
      <FormSelect
        id="proficiencyLevel"
        label="Рівень:"
        selectionState={level}
        options={proficiencyLevelOptions}
      />
      <button className={classes.button} onClick={formSubmissionHandler}>
        Підтвердити
      </button>
    </div>
  );
};

export default AddLanguageForm;
