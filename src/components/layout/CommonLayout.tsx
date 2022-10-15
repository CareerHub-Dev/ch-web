import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import Background from './Background';
import Footer from './Footer';
const HorizontalNavbar = dynamic(() => import('./HorizontalNavbar'), {
  ssr: false,
});

const CommonLayout = (
  opts: {
    withBackground: boolean;
  } = {
    withBackground: false,
  }
) =>
  function CommonLayoutFn(page: ReactNode) {
    return (
      <>
        <HorizontalNavbar />
        <main>{page}</main>
        <Footer />
        {opts.withBackground && <Background />}
      </>
    );
  };
export default CommonLayout;
