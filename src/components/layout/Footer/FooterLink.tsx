import Link from 'next/link';

const linkClasses = 'text-gray-500 hover:text-darkerBlue hover:underline';

const FooterLink = ({
  item,
}: {
  item: {
    href: string;
    text: string;
    newTab?: boolean;
  };
}) => {
  if (item.newTab) {
    return (
      <a
        className={linkClasses}
        href={item.href}
        target="_blank"
        rel="noreferrer"
      >
        {item.text}
      </a>
    );
  }

  return (
    <Link href={item.href}>
      <a className={linkClasses}>{item.text}</a>
    </Link>
  );
};
export default FooterLink;
