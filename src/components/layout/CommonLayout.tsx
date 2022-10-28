import type { ReactNode } from 'react';
import HorizontalNavbar from './HorizontalNavbar';
import Footer from './Footer';
import Background from './Background';

export default function CommonLayout(page: ReactNode) {
  return (
    <>
      <main className="flex flex-col h-screen">
        <div className="grow">
          <HorizontalNavbar />
          {page}
        </div>
        <Footer />
      </main>
      <Background />
    </>
  );
}
