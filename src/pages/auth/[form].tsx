import { useRouter } from 'next/router';
import FormWrapper from '@/components/auth/FormWrapper';
import ForgotPasswordForm from '@/components/auth/forms/ForgotPasswordForm';
import RegisterForm from '@/components/auth/forms/RegisterForm';
import LoginForm from '@/components/auth/forms/LoginForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import classes from '@/styles/auth.module.scss';

const AuthPage = () => {
  const router = useRouter();
  const form = router.query.form as string;

  let displayedForm;
  switch (form) {
    case 'forgot-password':
      displayedForm = <ForgotPasswordForm />;
      break;
    case 'register':
      displayedForm = (
        <RegisterForm />
      );
      break;
    case 'login':
      displayedForm = <LoginForm />;
      break;
    default:
      displayedForm = <LoadingSpinner />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <FormWrapper>{displayedForm}</FormWrapper>
      </div>
    </div>
  );
};

export default AuthPage;
