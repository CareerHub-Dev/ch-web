import { Fragment } from 'react';
import { useRouter } from 'next/router';
import useSession from '@/hooks/useSession';
import Link from 'next/link';
import UserMenuAvatar from './UserMenuAvatar';
import SignOutIcon from '@/components/ui/icons/SignOutIcon';
import CogIcon from '@/components/ui/icons/CogIcon';
import { Menu, Transition } from '@headlessui/react';

const itemClassName =
  'group flex items-center justify-items-center gap-2 font-semibold w-full px-4 py-2 text-sm first:pt-3 last:pb-3 text-sm hover:bg-lightGray';

const popupClassName =
  'absolute overflow-hidden bg-white rounded-md shadow-lg z-50 translate-y-2';

const UserMenuPopper = () => {
  const { logout } = useSession();
  const router = useRouter();

  const logoutClickHandler = () => {
    logout();
    router.push('/');
  };

  return (
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
        <Menu.Items className={popupClassName}>
          <Menu.Item>
            {({ active }) => (
              <Link href={'/my-profile/edit'}>
                <a className={itemClassName}>
                  <CogIcon />
                  Налаштування
                </a>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button className={itemClassName} onClick={logoutClickHandler}>
                <SignOutIcon />
                Вийти
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default UserMenuPopper;
