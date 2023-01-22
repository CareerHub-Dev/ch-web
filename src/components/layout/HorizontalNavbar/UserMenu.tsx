// import { Fragment } from 'react';
// import { useRouter } from 'next/router';
// import useSession from '@/hooks/useSession';
// import UserMenuAvatar from './UserMenuAvatar';
// import Link from 'next/link';
// import { Menu, Transition } from '@headlessui/react';
// import {
//   UserCircleIcon,
//   Cog6ToothIcon,
//   ArrowLeftOnRectangleIcon,
//   DocumentIcon,
// } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import cn from 'classnames';
import {
  ArrowLeftOnRectangleIcon,
  Cog6ToothIcon,
  DocumentIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import UserMenuAvatar from './UserMenuAvatar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSession from '@/hooks/useSession';

// import cn from 'classnames';

// const itemClassName =
//   'group flex items-center justify-items-center gap-2 font-semibold w-full px-4 py-2 text-sm first:pt-3 last:pb-3 text-sm overflow-hidden rounded-md';

// const UserMenu = () => {
//   const { logout } = useSession();
//   const router = useRouter();

//   const logoutClickHandler = () => {
//     logout();
//     router.push('/');
//   };

//   // const pushRoute = (route: string) => () => router.push(route);

//   return (
//     <section className="hidden md:flex items-center justify-between">
//       <div className="flex items-center">
//         <Menu as="div" className="relative">
//           <Menu.Button
//             className="flex rounded-full bg-primaryGray text-sm focus:outline-none
//               focus:ring-2 focus:ring-lightGray focus:ring-offset-2
//             focus:ring-offset-darkBlueAccent"
//           >
//             <UserMenuAvatar />
//           </Menu.Button>

//           <Transition
//             as={Fragment}
//             enter="transition ease-out duration-100"
//             enterFrom="transform opacity-0 scale-95"
//             enterTo="transform opacity-100 scale-100"
//             leave="transition ease-in duration-75"
//             leaveFrom="transform opacity-100 scale-100"
//             leaveTo="transform opacity-0 scale-95"
//           >
//             <Menu.Items
//               className="z-20 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-primaryGray rounded-md
//                 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
//             >
//               <Menu.Item>
//                 {({ active }) => (
//                   <Link
//                     href={'/my-profile'}
//                     passHref
//                     className={cn(itemClassName, active && 'bg-lightBlue')}
//                   >
//                     <UserCircleIcon className="w-6 h-6" />
//                     Мій профіль
//                   </Link>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <Link
//                     href={'/my-cvs'}
//                     passHref
//                     className={cn(itemClassName, active && 'bg-lightBlue')}
//                   >
//                     <DocumentIcon className="w-6 h-6" />
//                     Мої резюме
//                   </Link>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <Link
//                     href={'/my-profile/edit'}
//                     passHref
//                     className={cn(itemClassName, active && 'bg-lightBlue')}
//                   >
//                     <Cog6ToothIcon className="w-6 h-6" />
//                     Налаштування
//                   </Link>
//                 )}
//               </Menu.Item>
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     className={cn(itemClassName, active && 'bg-lightBlue')}
//                     onClick={logoutClickHandler}
//                   >
//                     <ArrowLeftOnRectangleIcon className="w-6 h-6" />
//                     Вийти
//                   </button>
//                 )}
//               </Menu.Item>
//             </Menu.Items>
//           </Transition>
//         </Menu>
//       </div>
//     </section>
//   );
// };
// export default UserMenu;

export function UserMenu() {
  const { logout } = useSession();
  const router = useRouter();

  const logoutClickHandler = () => {
    logout();
    router.push('/');
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <UserMenuAvatar />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                href={'/my-profile'}
                passHref
                className={cn(active && 'bg-gray-100', itemClassName)}
              >
                <UserCircleIcon className="w-6 h-6" />
                Мій профіль
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href={'/my-cvs'}
                passHref
                className={cn(active && 'bg-gray-100', itemClassName)}
              >
                <DocumentIcon className="w-6 h-6" />
                Мої резюме
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href={'/my-profile/edit'}
                passHref
                className={cn(active && 'bg-gray-100', itemClassName)}
              >
                <Cog6ToothIcon className="w-6 h-6" />
                Налаштування
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={cn(active && 'bg-gray-100', itemClassName)}
                onClick={logoutClickHandler}
              >
                <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                Вийти
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const itemClassName =
  'group flex items-center justify-items-center gap-2 w-full px-4 py-2 text-sm first:pt-3 last:pb-3 overflow-hidden rounded-md text-gray-700 w-full';
