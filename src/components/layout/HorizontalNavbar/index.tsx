import { useRouter } from 'next/router';
import NavLink from './NavLink';

const links = [
  {
    href: '/',
    text: 'Головна',
    exact: true,
  },
  {
    href: '/companies',
    text: 'Компанії',
  },
  {
    href: '/offers',
    text: 'Вакансії',
  },
];

const HorizontalNavbar = () => {
  const { pathname } = useRouter();

  return (
    <header className="bg-white flex justify-between items-center h-20 border px-12">
      <h1 className="font-rancho pointer-events-none text-3xl select-none inline-block">
        CareerHub
      </h1>
      <nav>
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
      </nav>
    </header>
  );
};
export default HorizontalNavbar;
