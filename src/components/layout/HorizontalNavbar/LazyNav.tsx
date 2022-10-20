import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import NavLink from './NavLink';
import UserMenu from './UserMenu';
import getNavigationLinks from '@/lib/navigation-links';

const LazyNav = () => {
  const { pathname } = useRouter();
  const auth = useAuth();
  const links = getNavigationLinks(auth?.session?.role);

  return (
    <nav className="flex gap-12 items-center">
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <NavLink
              text={link.text}
              href={link.href}
              active={
                link.exact
                  ? pathname === link.href
                  : pathname.includes(link.href)
              }
            />
          </li>
        ))}
      </ul>
      {auth.isLoggedIn && <UserMenu />}
    </nav>
  );
};
export default LazyNav;
