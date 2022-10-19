import cn from 'classnames';

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
    <nav className="text-sm md:px-4 w-full mb-8 border-y border-primaryGray">
      <ul className="flex items-center gap-2">
        {sections.map((item) => {
          const { title, section } = item;
          return (
            <li
              key={section}
              className={cn(
                'border-b-2 transition-all ease-in duration-200',
                section === currentSection
                  ? 'border-primaryBlue'
                  : 'border-transparent'
              )}
            >
              <a
                onClick={() => onChangeRoute(section)}
                className="flex px-2 my-2 cursor-pointer bg-transparent rounded-md leading-8 text-center hover:bg-lightBlue ease-in duration-200"
              >
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default NavigationMenu;
