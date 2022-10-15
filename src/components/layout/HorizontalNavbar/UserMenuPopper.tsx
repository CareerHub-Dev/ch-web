import { useBoolean } from 'usehooks-ts';
import useAuth from '@/hooks/useAuth';
import Overlay from '@/components/ui/Overlay';
import Link from 'next/link';
import UserMenuAvatar from './UserMenuAvatar';
import SignOutIcon from '@/components/ui/icons/SignOutIcon';
import CogIcon from '@/components/ui/icons/CogIcon';

import cn from 'classnames';

const itemClassName =
  'group flex items-center font-semibold w-full px-4 py-2 text-sm first:pt-3 last:pb-3 text-sm hover:bg-primaryGrey';

const iconSpanClassName = 'mr-2 h-5 w-5';

const popupClassName =
  'absolute overflow-hidden bg-white rounded-md transform opacity-100 scale-100 shadow-lg z-50 translate-y-2';

const UserMenuPopper = () => {
  const optionsPopup = useBoolean(false);
  const auth = useAuth();

  return (
    <Overlay className="relative" onOutsideClick={optionsPopup.setFalse}>
      <button
        type="button"
        onClick={optionsPopup.toggle}
        className="flex rounded-full bg-gray-300 text-sm focus:outline-none 
      focus:ring-2 focus:ring-lightGrey focus:ring-offset-2 
      focus:ring-offset-darkBlueAccent"
      >
        <UserMenuAvatar />
      </button>

      <div className={cn(popupClassName, !optionsPopup.value && 'hidden')}>
        <Link href={'my-profile/edit'}>
          <a className={itemClassName}>
            <span className={iconSpanClassName}>
              <CogIcon />
            </span>
            Налаштування
          </a>
        </Link>
        <button className={itemClassName} onClick={auth.logout}>
          <span className={iconSpanClassName}>
            <SignOutIcon />
          </span>
          Вийти
        </button>
      </div>
    </Overlay>
  );
};
export default UserMenuPopper;
