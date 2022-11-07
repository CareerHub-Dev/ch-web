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
        isCurrent ? 'border-lightBlueAccent text-lightBlueAccent' : 'border-transparent'
      )}
    >
      <button
        onClick={onClick}
        className="flex px-2 my-2 cursor-pointer bg-transparent rounded-md leading-8 text-center hover:bg-lightBlue ease-in duration-200"
      >
        {title}
      </button>
    </li>
  );
};
export default NavigationMenuItem;
