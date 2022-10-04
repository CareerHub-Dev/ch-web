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
    <Link href={href}>
      <a
        className={cn(
          'hover:text-darkerBlue hover:underline font-semibold',
          active && 'text-primaryBlue hover:text-primaryBlue'
        )}
      >
        {text}
      </a>
    </Link>
  );
};
export default NavLink;
