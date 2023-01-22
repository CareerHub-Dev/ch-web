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
          : 'text-gray-500 hover:text-gray-900 '
      )}
    >
      {text}
    </Link>
  );
};
export default NavLink;
