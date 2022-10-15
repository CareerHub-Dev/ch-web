import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";
import getNavigationLinks from "@/lib/navigation-links";

const HorizontalNavbar = () => {
  const { pathname } = useRouter();
  const auth = useAuth();
  console.log(auth);
  
  const links = getNavigationLinks(auth?.session?.role);

  return (
    <header className="relative bg-white flex justify-between items-center h-20 border px-12">
      <h1 className="font-rancho pointer-events-none text-3xl select-none inline-block">
        CareerHub
      </h1>
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
    </header>
  );
};
export default HorizontalNavbar;
