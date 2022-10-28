import NavigationMenuItem from './NavigationMenuItem';

const NavigationMenu = ({
  sections,
  onChangeRoute,
  currentSection,
}: {
  sections: {
    title: string;
    section: string;
  }[];
  onChangeRoute: (route: string) => void;
  currentSection?: string | string[];
}) => {
  return (
    <nav className="text-sm px-4 w-full mb-8 border-y border-primaryGray overflow-x-auto">
      <ul className="flex flex-col md:flex-row md:items-center md:gap-2">
        {sections.map((item, index) => (
          <NavigationMenuItem
            {...item}
            key={index}
            isCurrent={currentSection === item.section}
            onClick={() => onChangeRoute(item.section)}
          />
        ))}
      </ul>
    </nav>
  );
};
export default NavigationMenu;
