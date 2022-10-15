import NureLogo from '@/resources/logos/NureLogo.svg';
import CareerLogo from '@/resources/logos/CareerLogo.svg';
import Head from 'next/head';
import Footer from '@/components/layout/Footer';
import Background from '@/components/layout/Background';
import dynamic from 'next/dynamic';
import { studentNavLinks } from '@/lib/navigation-links';

import classes from '@/styles/index.module.scss';

const AuthButtons = dynamic(() => import('@/components/landing/AuthButtons'), {
  ssr: false,
});
const HorizontalNavbar = dynamic(() => import('@/components/layout/HorizontalNavbar'), {
  ssr: false,
});

const LandingPage: NextPageWithLayout = () => {
  return (
    <>
      <header className="mt-20 flex flex-col items-center content-center">
        <div className={classes.logos} id="partnerLogos">
          <NureLogo id="nureLogo" />
          <CareerLogo id="careerLogo" />
        </div>
        <h1 className={classes.title}>CareerHub</h1>
      </header>
      <AuthButtons />
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
      <HorizontalNavbar links={studentNavLinks}/>
      <main>{page}</main>
      <Footer />
      <Background />
    </>
  );
};

export default LandingPage;
