import Link from "next/link";

const linkClasses =
  "text-base font-medium text-gray-500 hover:text-gray-900 transition-all ease-in-out duration-200";

export function FooterLink({
  item,
}: {
  item: {
    href: string;
    text: string;
    newTab?: boolean;
  };
}) {
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
    <Link href={item.href} className={linkClasses}>
      {item.text}
    </Link>
  );
}
