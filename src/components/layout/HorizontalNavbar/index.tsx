const HorizontalNavbar = () => {
  return (
    <header className="bg-white flex justify-between items-center h-20 border px-12">
      <h1 className="font-rancho pointer-events-none text-3xl select-none inline-block">
        CareerHub
      </h1>
      <nav>
        <ul className="flex gap-6" id="horizontalNavbar"></ul>
      </nav>
    </header>
  );
};
export default HorizontalNavbar;
