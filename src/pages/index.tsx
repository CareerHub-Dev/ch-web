import type { NextPageWithLayout } from './_app';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import NureLogo from '@/assets/logos/NureLogo.svg';
import CareerLogo from '@/assets/logos/CareerLogo.svg';
import Head from 'next/head';
import Background from '@/components/layout/Background';

import classes from '@/styles/index.module.scss';

const LandingPage: NextPageWithLayout = () => {
  const router = useRouter();
  const auth = useAuth();

  const routingHandler = (path: string) => (event: any) => {
    event.preventDefault();
    router.push(path);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes['nure-logo']} id="partnerLogos">
          <NureLogo id="nureLogo" />
          <CareerLogo id="careerLogo" />
        </div>
        <div className={classes.content}>
          <h1 className={classes.title}>CareerHub</h1>

          {!auth.isLoggedIn && (
            <div className={classes.actions}>
              <button
                className={classes.register}
                type="button"
                onClick={routingHandler('/auth/register')}
              >
                Зареєструватися
              </button>
              <button
                className={classes.register}
                type="button"
                onClick={routingHandler('/auth/login')}
              >
                Увійти
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

LandingPage.getLayout = (page) => {
  return (
    <>
      <Head>
        <title>{'CareerHub 🇺🇦'}</title>
        <meta
          name="description"
          content={`CareerHub - це сервіс пошуку вакансій для студентів ХНУРЕ від студентів ХНУРЕ. Розроблено при підтримці центра 'Кар'єра'.`}
        />
      </Head>
      <main>{page}</main>
      <Background />
    </>
  );
};

export default LandingPage;
