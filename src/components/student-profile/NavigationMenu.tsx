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
  currentSection: string;
}) => {
  return (
    <nav className="text-xs md:text-sm md:px-4 w-full mb-8 border-y border-primaryGray">
      <ul className="flex items-center gap-2">
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
