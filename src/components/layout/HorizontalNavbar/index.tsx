import useSession from '@/hooks/useSession';
import getNavigationLinks from '@/lib/navigation-links';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { AuthLinks, MobileAuthLinks } from './AuthLinks';
import NavLink, { MobileNavLink } from './NavLink';
import { MobileUserMenu, UserMenu } from './UserMenu';

export default function HorizontalNavbar() {
  const { pathname } = useRouter();
  const { data: session, status } = useSession();
  const links = getNavigationLinks(session?.role);

  return (
    <Popover className="relative bg-white border" as="header">
      <div className="flex items-center justify-between px-12 h-16 md:justify-start md:space-x-10">
        <div>
          <h1 className="font-rancho pointer-events-none text-3xl select-none inline-block">
            {'CareerHub'}
          </h1>
        </div>
        <div className="-my-2 -mr-2 md:hidden">
          <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
            <span className="sr-only">{'Відкрити меню'}</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </Popover.Button>
        </div>
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <Popover.Group as="nav" className="flex space-x-10">
            {status !== 'loading' &&
              links.map((link) => (
                <NavLink
                  key={link.href}
                  text={link.text}
                  href={link.href}
                  active={
                    link.exact
                      ? pathname === link.href
                      : pathname.includes(link.href)
                  }
                />
              ))}
          </Popover.Group>
          {status === 'unauthenticated' ? <AuthLinks /> : <UserMenu />}
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden z-20"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-rancho pointer-events-none text-3xl select-none inline-block">
                    {'CareerHub'}
                  </h1>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span className="sr-only">{'Закрити меню'}</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5">
              <div className="flex flex-col space-y-1 px-2 pt-2 pb-3 sm:px-3">
                {status !== 'loading' &&
                  links.map((link) => (
                    <MobileNavLink
                      key={link.href}
                      text={link.text}
                      href={link.href}
                      active={
                        link.exact
                          ? pathname === link.href
                          : pathname.includes(link.href)
                      }
                    />
                  ))}
              </div>
              {status === 'unauthenticated' ? (
                <MobileAuthLinks />
              ) : (
                <MobileUserMenu />
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

// import { useRouter } from 'next/router';
// import useSession from '@/hooks/useSession';
// import NavLink from './NavLink';
// import UserMenu from './UserMenu';
// import PopOverMenu from './PopoverMenu';
// import getNavigationLinks from '@/lib/navigation-links';

// const HorizontalNavbar = () => {
//   const { pathname } = useRouter();
//   const { data: session, status } = useSession();
//   const links = getNavigationLinks(session?.role);

//   return (
//     <header className="relative bg-white flex justify-between items-center h-16 border px-12 w-full">
//       <h1 className="font-rancho pointer-events-none text-3xl select-none inline-block">
//         CareerHub
//       </h1>
//       <div className="-mr-2 flex items-center md:hidden">
//         <PopOverMenu />
//       </div>
//       <nav className="hidden md:flex gap-12 items-center">
//         <ul className="flex gap-6">
//           {status !== 'loading' &&
//             links.map((link) => (
//               <li key={link.href}>
//                 <NavLink
//                   text={link.text}
//                   href={link.href}
//                   active={
//                     link.exact
//                       ? pathname === link.href
//                       : pathname.includes(link.href)
//                   }
//                 />
//               </li>
//             ))}
//         </ul>
//         {status === 'authenticated' && <UserMenu />}
//       </nav>
//     </header>
//   );
// };
// export default HorizontalNavbar;
