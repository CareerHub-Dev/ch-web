import FooterLink from './FooterLink';
import TelegramIcon from '@/components/ui/icons/TelegramIcon';
import cn from 'classnames';
import FacebookIcon from '@/components/ui/icons/FacebookIcon';

const Footer = ({ className }: { className?: string }) => {
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
                text: 'CareerHub © 2022',
              }}
            />
          </li>
          <li>
            <a href="https://t.me/career_nure" target="_blank" rel="noreferrer">
              <TelegramIcon className="h-6 w-6 cursor-pointer text-darkerBlue hover:bg-lightBlue rounded-full" />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/groups/career.nure/about"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon className="h-6 w-6 cursor-pointer text-darkerBlue hover:bg-lightBlue rounded-full" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
export default Footer;
