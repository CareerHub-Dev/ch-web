import type { NextPage } from 'next';
import NureLogo from '@/assets/logos/NureLogo.svg';
import CareerLogo from '@/assets/logos/CareerLogo.svg';

import classes from '@/styles/index.module.scss';

const LandingPage: NextPage = () => {
  return (
    <div className={classes.root}>
      <div className={classes['nure-logo']} id="partnerLogos">
        <NureLogo id="nureLogo" />
        <CareerLogo id="careerLogo" />
      </div>
      <div className={classes.content}>
        <h1 className={classes.title}>CareerHub</h1>
      </div>
    </div>
  );
};

export default LandingPage;
