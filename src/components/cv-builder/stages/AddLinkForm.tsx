import FormInput from '@/components/ui/form/FormInput';

import cn from 'classnames';
import classes from './Stage.module.scss';

const AddLinkForm: React.FC<{
  onSubmit: (...params: Array<any>) => any;
  title: any;
  url: any;
}> = ({ onSubmit, title, url }) => {
  const formSubmissionHandler = (event: any) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className={cn(classes['modal-default'], classes.body)}>
      <FormInput id="link" input={title} label="Ім'я посилання:" />
      <FormInput id="url" input={url} label="Посилання:" />
      <button className={classes.button} onClick={formSubmissionHandler}>
        Підтвердити
      </button>
    </div>
  );
};

export default AddLinkForm;
