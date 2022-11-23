import { Fragment } from 'react';
import { useRouter } from 'next/router';
import useSession from '@/hooks/useSession';
import UserMenuAvatar from './UserMenuAvatar';
import { Menu, Transition } from '@headlessui/react';
import {
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

import cn from 'classnames';

const itemClassName =
  'group flex items-center justify-items-center gap-2 font-semibold w-full px-4 py-2 text-sm first:pt-3 last:pb-3 text-sm overflow-hidden rounded-md';

const UserMenu = () => {
  const { logout } = useSession();
  const router = useRouter();

  const logoutClickHandler = () => {
    logout();
    router.push('/');
  };

  const pushRoute = (route: string) => () => router.push(route);

  return (
    <section className="hidden md:flex items-center justify-between">
      <div className="flex items-center">
        <Menu as="div" className="relative">
          <Menu.Button
            className="flex rounded-full bg-primaryGray text-sm focus:outline-none 
              focus:ring-2 focus:ring-lightGray focus:ring-offset-2 
            focus:ring-offset-darkBlueAccent"
          >
            <UserMenuAvatar />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className="z-20 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-primaryGray rounded-md 
                bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={pushRoute('/my-profile')}
                    className={cn(itemClassName, active && 'bg-lightBlue')}
                  >
                    <UserCircleIcon className="w-6 h-6" />
                    Мій профіль
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={pushRoute('/my-profile/edit')}
                    className={cn(itemClassName, active && 'bg-lightBlue')}
                  >
                    <Cog6ToothIcon className="w-6 h-6" />
                    Налаштування
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={cn(itemClassName, active && 'bg-lightBlue')}
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
      </div>
    </section>
  );
};
export default UserMenu;
