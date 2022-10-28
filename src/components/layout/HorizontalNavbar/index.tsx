import { useRouter } from 'next/router';
import useSession from '@/hooks/useSession';
import NavLink from './NavLink';
import UserMenu from './UserMenu';
import getNavigationLinks from '@/lib/navigation-links';

const HorizontalNavbar = () => {
  const { pathname } = useRouter();
  const { data: session, status } = useSession();
  const links = getNavigationLinks(session?.role);

  return (
    <header className="relative bg-white flex justify-between items-center h-16 border px-12 w-full">
      <h1 className="font-rancho pointer-events-none text-3xl select-none inline-block">
        CareerHub
      </h1>
      <nav className="flex gap-12 items-center">
        <ul className="flex gap-6">
          {status !== 'loading' &&
            links.map((link) => (
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
        {status === 'authenticated' && <UserMenu />}
      </nav>
    </header>
  );
};
export default HorizontalNavbar;
