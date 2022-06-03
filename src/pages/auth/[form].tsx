import { GetStaticPropsContext } from 'next';
import FormWrapper from '@/components/auth/FormWrapper';
import ForgotPasswordForm from '@/components/auth/forms/ForgotPasswordForm';
import RegisterForm from '@/components/auth/forms/RegisterForm';
import LoginForm from '@/components/auth/forms/LoginForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import classes from '@/styles/auth.module.scss';

type Props = {
  form: string;
};

const AuthPage = ({ form }: Props) => {
  let displayedForm;
  switch (form) {
    case 'forgot-password':
      displayedForm = <ForgotPasswordForm />;
      break;
    case 'register':
      displayedForm = <RegisterForm />;
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {
    props: {
      form: context.params?.form,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          form: 'forgot-password',
        },
      },
      {
        params: {
          form: 'register',
        },
      },
      {
        params: {
          form: 'login',
        },
      },
    ],
    fallback: false,
  };
};
