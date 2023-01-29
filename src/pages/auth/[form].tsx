import {ForgotPasswordForm} from '@/components/auth/forms/ForgotPasswordForm';
import { LoginForm } from '@/components/auth/forms/LoginForm';
import {RegisterForm} from '@/components/auth/forms/RegisterForm';
import FormWrapper from '@/components/auth/FormWrapper';
import Background from '@/components/layout/Background';
import Footer from '@/components/layout/Footer';
import { GetStaticPropsContext } from 'next';

import classes from '@/styles/auth.module.scss';

const AuthPage: NextPageWithLayout<{ form: string }> = ({ form }) => {
  return (
    <div className={classes.form}>
      <FormWrapper>
        {form === 'login' ? (
          <LoginForm />
        ) : form === 'register' ? (
          <RegisterForm />
        ) : (
          <ForgotPasswordForm />
        )}
      </FormWrapper>
    </div>
  );
};

AuthPage.getLayout = (page) => {
  return (
    <>
      <main className="flex flex-col h-screen">
        <div className="grow flex justify-center py-20">{page}</div>
        <Footer className="shrink-0" />
      </main>
      <Background />
    </>
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
