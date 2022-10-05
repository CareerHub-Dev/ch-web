import FooterLink from './FooterLink';

const footerNavItems = [
  {
    href: '/',
    text: 'CareerHub © 2022',
  },
  {
    href: 'http://rabota.nure.ua/',
    text: `Центр-Кар'єра`,
    newTab: true,
  },
];

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 px-4">
      <nav className="flex items-center content-center justify-center">
        <ul className="mx-auto flex gap-6 py-4">
          {footerNavItems.map((item) => (
            <li key={item.href}>
              <FooterLink item={item} />
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};
export default Footer;
