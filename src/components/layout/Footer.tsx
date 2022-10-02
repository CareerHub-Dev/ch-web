import Link from 'next/link';

const footerNavItems = [
  {
    href: '/',
    text: 'CareerHub © 2022',
  },
  {
    href: '/help',
    text: 'Допомога',
  },
  {
    href: '#',
    text: `Кар'єрний центр`,
  },
];

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 px-4">
      <nav className="flex items-center content-center justify-center">
        <ul className="mx-auto flex gap-4 py-4">
          {footerNavItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <a className="text-gray-500 hover:text-darkerBlue hover:underline">
                  {item.text}
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <section></section>
      </nav>
    </footer>
  );
};
export default Footer;
