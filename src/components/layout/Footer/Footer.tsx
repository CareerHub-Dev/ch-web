import { FooterLink } from './FooterLink';
import TelegramIcon from '@/components/icons/TelegramIcon';
import cn from 'classnames';
import FacebookIcon from '@/components/icons/FacebookIcon';

export function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();
  const copyRight = `CareerHub © ${currentYear}`;

  return (
    <footer
      className={cn(
        'w-full px-4 py-8 bg-white border bg-opacity-60',
        className
      )}
    >
      <nav className="flex items-center content-center justify-center">
        <ul className="mx-auto flex gap-6 py-4">
          <li className="flex items-center">
            <FooterLink
              item={{
                href: '/',
                text: copyRight,
              }}
            />
          </li>
          <li>
            <a
              href="https://t.me/career_nure"
              target="_blank"
              rel="noreferrer"
              aria-label="Career Nure Telegram"
            >
              <TelegramIcon className="h-6 w-6 cursor-pointer text-darkerBlue hover:bg-lightBlue rounded-full" />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/groups/career.nure/about"
              target="_blank"
              rel="noreferrer"
              aria-label="Career Nure Facebook"
            >
              <FacebookIcon className="h-6 w-6 cursor-pointer text-darkerBlue hover:bg-lightBlue rounded-full" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
