import { GetStaticPropsContext } from 'next';
import FormWrapper from '@/components/auth/FormWrapper';
import ForgotPasswordForm from '@/components/auth/forms/ForgotPasswordForm';
import RegisterForm from '@/components/auth/forms/RegisterForm';
import LoginForm from '@/components/auth/forms/LoginForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import classes from '@/styles/auth.module.scss';
import React from 'react';

type Props = {
  form: string;
};

const AuthPage = ({ form }: Props) => {
  const displayedForm = AuthFormFactory(form);

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

const AuthFormFactory = (form: string): JSX.Element => {
  const options: { [key: string]: JSX.Element } = {
    'forgot-password': <ForgotPasswordForm />,
    register: <RegisterForm />,
    login: <LoginForm />,
    loading: <LoadingSpinner />,
  };

  return options[form];
};
