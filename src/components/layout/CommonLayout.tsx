import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import Background from './Background';
import Footer from './Footer';
import HorizontalNavbar from './HorizontalNavbar';

const CommonLayout = (
  opts: {
    withBackground: boolean;
    withFooter: boolean;
  } = {
    withBackground: false,
    withFooter: false,
  }
) =>
  function CommonLayoutFn(page: ReactNode) {
    return (
      <>
        <HorizontalNavbar />
        <main>{page}</main>
        {opts.withFooter && <Footer />}
        {opts.withBackground && <Background />}
      </>
    );
  };
export default CommonLayout;
