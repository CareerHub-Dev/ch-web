import NureLogo from '@/assets/logos/NureLogo.svg';
import CareerLogo from '@/assets/logos/CareerLogo.svg';
import Head from 'next/head';

import classes from '@/styles/index.module.scss';

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>{'CareerHub 🇺🇦'}</title>
        <meta
          name="description"
          content={`CareerHub - це сервіс пошуку вакансій для студентів ХНУРЕ від студентів ХНУРЕ. Розроблено при підтримці центра 'Кар'єра'.`}
        />
      </Head>
      <div className={classes.root}>
        <div className={classes['nure-logo']} id="partnerLogos">
          <NureLogo id="nureLogo" />
          <CareerLogo id="careerLogo" />
        </div>
        <div className={classes.content}>
          <h1 className={classes.title}>CareerHub</h1>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
