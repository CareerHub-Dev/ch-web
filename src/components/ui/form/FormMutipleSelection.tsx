import type { AnyFn } from '@/lib/util/types';
import classes from './Form.module.scss';

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Array<Option>;
  label?: string;
  isItemSelected: AnyFn;
  onSelect: AnyFn;
};

const FormMultipleSelection = ({
  options,
  label,
  isItemSelected,
  onSelect,
}: Props) => {
  return (
    <>
      {label && <label className="g__text-bold">{label}</label>}
      {options.map(({ label, value }) => {
        const isSelected = isItemSelected(value);
        const changeHandler = onSelect.bind(null, value);

        return (
          <span key={value}>
            <input
              id={`${value}Checkbox`}
              type="checkbox"
              className={classes['checkbox-small']}
              checked={isSelected}
              onChange={changeHandler}
            />
            <label htmlFor={`${value}Checkbox`}>{label}</label>
          </span>
        );
      })}
    </>
  );
};
export default FormMultipleSelection;
