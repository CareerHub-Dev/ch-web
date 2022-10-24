import { useBoolean } from 'usehooks-ts';
import { useRouter } from 'next/router';
import useSession from '@/hooks/useSession';
import Overlay from '@/components/ui/Overlay';
import Link from 'next/link';
import UserMenuAvatar from './UserMenuAvatar';
import SignOutIcon from '@/components/ui/icons/SignOutIcon';
import CogIcon from '@/components/ui/icons/CogIcon';

import cn from 'classnames';

const itemClassName =
  'group flex items-center justify-items-center gap-2 font-semibold w-full px-4 py-2 text-sm first:pt-3 last:pb-3 text-sm hover:bg-lightGray';

const popupClassName =
  'absolute overflow-hidden bg-white rounded-md transform opacity-100 scale-100 shadow-lg z-50 translate-y-2';

const UserMenuPopper = () => {
  const optionsPopup = useBoolean(false);
  const { logout } = useSession();
  const router = useRouter();

  const logoutClickHandler = () => {
    logout();
    router.push('/');
  }

  return (
    <Overlay className="relative" onOutsideClick={optionsPopup.setFalse}>
      <button
        type="button"
        onClick={optionsPopup.toggle}
        className="flex rounded-full bg-primaryGray text-sm focus:outline-none 
      focus:ring-2 focus:ring-lightGray focus:ring-offset-2 
      focus:ring-offset-darkBlueAccent"
      >
        <UserMenuAvatar />
      </button>

      <div className={cn(popupClassName, !optionsPopup.value && 'hidden')}>
        <Link href={'/my-profile/edit'}>
          <a className={itemClassName}>
            <CogIcon />
            Налаштування
          </a>
        </Link>
        <button className={itemClassName} onClick={logoutClickHandler}>
          <SignOutIcon />
          Вийти
        </button>
      </div>
    </Overlay>
  );
};
export default UserMenuPopper;
