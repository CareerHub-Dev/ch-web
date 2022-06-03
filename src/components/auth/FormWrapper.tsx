import AuthRouting from './AuthRouting';
import classes from './FormWrapper.module.scss';

const FormWrapper: React.FC = ({ children }) => (
  <div className={classes.wrapper}>
    <h1 className={classes.title} id="authFormTitle">
      CareerHub
    </h1>
    {children}
    <AuthRouting />
  </div>
);
export default FormWrapper;
