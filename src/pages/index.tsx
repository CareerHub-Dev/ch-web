import Head from "next/head";
import NureIcon from "@/components/icons/NureIcon";
import CareerCenterIcon from "@/components/icons/CareerCenterIcon";
import CommonLayout from "@/components/layout/CommonLayout";

import classes from "@/styles/index.module.scss";

const LandingPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>{"CareerHub 🇺🇦"}</title>
        <meta
          name="description"
          content={`CareerHub - це сервіс пошуку вакансій для студентів ХНУРЕ від студентів ХНУРЕ. Розроблено при підтримці центра 'Кар'єра'.`}
        />
      </Head>
      <header className="mt-20 flex flex-col items-center content-center">
        <div className={classes.logos} id="partnerLogos">
          <NureIcon />
          <CareerCenterIcon />
        </div>
        <h1
          id="chTitle"
          className="font-rancho mt-4 text-6xl md:text-8xl lg:text-[150px] text-darkerBlue"
        >
          CareerHub
        </h1>
      </header>
    </>
  );
};

LandingPage.getLayout = CommonLayout;

export default LandingPage;
