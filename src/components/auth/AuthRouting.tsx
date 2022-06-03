import { useRouter } from 'next/router';
import classes from './AuthRouting.module.scss';

const AuthRouting = () => {
  const router = useRouter();
  const currentForm = router.query.form as string;

  const authFormChangeHandler = (newSection: string) => {
    router.push(newSection);
  };

  return (
    <div className={classes.controls}>
      {currentForm !== 'register' && (
        <button
          id="formSwitchButton-Register"
          onClick={authFormChangeHandler.bind(null, 'register')}
        >
          Зареєструватися
        </button>
      )}
      {currentForm !== 'login' && (
        <button
          id="formSwitchButton-Login"
          onClick={authFormChangeHandler.bind(null, 'login')}
        >
          Увійти
        </button>
      )}
      {currentForm !== 'forgot-password' && (
        <button
          id="formSwitchButton-forget"
          onClick={authFormChangeHandler.bind(null, 'forgot-password')}
        >
          Забув пароль?
        </button>
      )}
    </div>
  );
};
export default AuthRouting;
