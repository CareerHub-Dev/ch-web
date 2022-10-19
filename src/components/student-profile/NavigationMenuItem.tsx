import cn from 'classnames';

const NavigationMenuItem = ({
  section,
  title,
  isCurrent,
  onClick,
}: {
  section: string;
  title: string;
  isCurrent: boolean;
  onClick: () => void;
}) => {
  return (
    <li
      key={section}
      className={cn(
        'border-b-2 transition-all ease-in duration-200',
        isCurrent ? 'border-primaryBlue' : 'border-transparent'
      )}
    >
      <a
        onClick={onClick}
        className="flex px-2 my-2 cursor-pointer bg-transparent rounded-md leading-8 text-center hover:bg-lightBlue ease-in duration-200"
      >
        {title}
      </a>
    </li>
  );
};
export default NavigationMenuItem;
