import Link from 'next/link';
import cn from 'classnames';

const NavLink = ({
  href,
  active,
  text,
}: {
  href: string;
  active?: boolean;
  text: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'text-base font-medium transition-all ease duration-200',
        active
          ? 'text-blue-500 hover:text-blue-900'
          : 'text-gray-500 hover:text-gray-900'
      )}
    >
      {text}
    </Link>
  );
};
export default NavLink;

export const MobileNavLink = ({
  href,
  active,
  text,
}: {
  href: string;
  active?: boolean;
  text: string;
}) => {
  return (
    <Link
      href={href}
      className={cn(
        active
          ? 'bg-gray-100 text-blue-500 hover:text-blue-900'
          : 'hover:bg-gray-200 hover:bg-opacity-75 text-gray-500 hover:text-gray-900',
        'block px-3 py-2 rounded-md text-base font-medium transition-all ease-in-out duration-200'
      )}
    >
      {text}
    </Link>
  );
};
