import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { GetStaticPropsContext } from 'next';
import FormWrapper from '@/components/auth/FormWrapper';
import ForgotPasswordForm from '@/components/auth/forms/ForgotPasswordForm';
import RegisterForm from '@/components/auth/forms/RegisterForm';
import LoginForm from '@/components/auth/forms/LoginForm';
import UserRole from '@/models/enums/UserRole';

import classes from '@/styles/auth.module.scss';

const AuthPage = ({ form }: { form: string }) => {
  const router = useRouter();
  const authStatus = useAuth();
  if (authStatus.isLoggedIn) {
    router.push(
      authStatus.role === UserRole.Student ? '/my-profile' : '/my-dashboard'
    );
  }
  const displayedForm =
    form === 'login' ? (
      <LoginForm />
    ) : form === 'register' ? (
      <RegisterForm />
    ) : (
      <ForgotPasswordForm />
    );
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
