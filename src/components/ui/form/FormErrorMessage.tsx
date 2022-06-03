import classes from './Form.module.scss';

const FormErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <p className={classes['error-message']}>
      {/* <i className="fa-solid fa-exclamation"/> */}
      {message}
    </p>
  );
};

export default FormErrorMessage;
