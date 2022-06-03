import classes from './Form.module.scss';

const FormCheckbox: React.FC<{
  id: string;
  checked: boolean;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => any;
  label?: string;
}> = ({ id, checked, label, onToggle }) => {
  return (
    <div className={classes['checkbox-wrapper']}>
      <input
        id={`${id}Checkbox`}
        name={`${id}Checkbox`}
        type="checkbox"
        checked={checked}
        onChange={onToggle}
      />
      {label && (
        <label id={`${id}Label`} htmlFor={`${id}Checkbox`}>
          {label}
        </label>
      )}
    </div>
  );
};

export default FormCheckbox;
