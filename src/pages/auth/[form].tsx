import type { NextPageWithLayout } from '../_app';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import { GetStaticPropsContext } from 'next';
import ForgotPasswordForm from '@/components/auth/forms/ForgotPasswordForm';
import RegisterForm from '@/components/auth/forms/RegisterForm';
import LoginForm from '@/components/auth/forms/LoginForm';
import UserRole from '@/models/enums/UserRole';
import FormWrapper from '@/components/auth/FormWrapper';
import Background from '@/components/layout/Background';
import Footer from '@/components/layout/Footer';

import classes from '@/styles/auth.module.scss';

const AuthPage: NextPageWithLayout<{ form: string }> = ({ form }) => {
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
    <div className={classes.form}>
      <FormWrapper>{displayedForm}</FormWrapper>
    </div>
  );
};

AuthPage.getLayout = (page) => {
  return (
    <>
      <main className="flex justify-center my-32">{page}</main>
      <Footer />
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
