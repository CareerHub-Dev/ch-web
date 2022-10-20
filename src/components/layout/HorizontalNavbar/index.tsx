import dynamic from 'next/dynamic';

const LazyNav = dynamic(() => import('./LazyNav'), { ssr: false });

const HorizontalNavbar = () => {
  return (
    <header className="relative bg-white flex justify-between items-center h-16 border px-12 w-full">
      <h1 className="font-rancho pointer-events-none text-3xl select-none inline-block">
        CareerHub
      </h1>
      <LazyNav />
    </header>
  );
};
export default HorizontalNavbar;
