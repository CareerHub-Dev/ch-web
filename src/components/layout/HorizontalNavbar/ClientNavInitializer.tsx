import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { createPortal } from 'react-dom';
import NavLink from './NavLink';

const ClientNavInitializer = () => {
  const { session } = useAuth();
  const { pathname } = useRouter();
  const horizontalNavbar = document.getElementById('horizontalNavbar');
  if (!horizontalNavbar) {
    return null;
  }
  const links: AppNavigationLink[] = [];

  return createPortal(
    <ul className="flex gap-6" id="horizontalNavbar">
      {links.map((link) => (
        <li key={link.href}>
          <NavLink
            text={link.text}
            href={link.href}
            active={
              link.exact ? pathname === link.href : pathname.includes(link.href)
            }
          />
        </li>
      ))}
    </ul>,
    horizontalNavbar
  );
};
export default ClientNavInitializer;
