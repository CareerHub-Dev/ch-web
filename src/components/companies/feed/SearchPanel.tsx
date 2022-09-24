import LinkButton from '@/components/ui/LinkButton';
import { useRef } from 'react';
import classes from './SearchPanel.module.scss';

const SearchPanel = ({ onChange }: { onChange: (value: string) => any }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: any) => {
    event.preventDefault();
    onChange(inputRef.current!.value || '');
  };
  const resetHandler = (event: any) => {
    event.preventDefault();
    inputRef.current!.value = '';
    onChange('');
  };

  return (
    <form className={classes.form}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="companyName">Назва</label>
          <input
            id="companyName"
            type="search"
            ref={inputRef}
            placeholder={'Уведіть назву компанії'}
          />
        </div>
      </div>
      <LinkButton onClick={submitHandler}>Пошук</LinkButton>
    </form>
  );
};
export default SearchPanel;
