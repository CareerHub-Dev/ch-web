import { useContext, useState } from 'react';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { useRouter } from 'next/router';
import AuthContext from '@/store/auth-context';
import BurgerMenu from './BurgerMenu';
import ProfileIcon from './ProfileIcon';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import LinkButton from '@/components/ui/LinkButton';
import cn from 'classnames';
import classes from './MainNavigation.module.scss';

const MainNavigation = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  const { width } = useWindowDimensions();

  const isLoggedIn = authCtx.isLoggedIn;
  const isPhoneScreen = width !== null && width < 600;

  const burgerOpenHandler = () => {
    setIsBurgerOpened((prevState) => !prevState);
  };

  const logoutClickHandler = () => {
    authCtx.logout();
    router.replace('/');
  };

  const loginClickHandler = () => {
    router.replace('/auth/login');
  };

  return (
    <header>
      <nav id="navbar" className={classes.nav}>
        <div id="navLogo" className={classes.logo}>
          <Link href={'/'}>CareerHub</Link>
        </div>
        <ul
          className={cn(classes.list, {
            [classes[`active`]]: isPhoneScreen && isBurgerOpened,
          })}
        >
          {isLoggedIn && (
            <>
              <li
                className={cn(
                  router.pathname.includes('/companies') &&
                    classes['active-link']
                )}
              >
                <Link href={'/companies/feed'}>Компанії</Link>
              </li>
              <li
                className={cn(
                  router.pathname.includes('/offers') && classes['active-link']
                )}
              >
                <Link href={'/offers/feed'}>Робота</Link>
              </li>
            </>
          )}
        </ul>
        {isLoggedIn ? (
          <>
            <ProfileIcon />
            <div className={classes['nav-user-menu']}>
              <Button
                id="logoutButton"
                className={cn('button-light', {
                  [classes.button]: isPhoneScreen,
                })}
                onClick={logoutClickHandler}
              >
                {isPhoneScreen ? (
                  <FontAwesomeIcon icon={faSignOutAlt} />
                ) : (
                  <span>Вийти</span>
                )}
              </Button>
            </div>
          </>
        ) : (
          <LinkButton onClick={loginClickHandler}>Увійти</LinkButton>
        )}
        {isPhoneScreen && (
          <div id="burgerButton" className={classes.burger}>
            <BurgerMenu
              onClick={burgerOpenHandler}
              isClicked={isBurgerOpened}
            />
          </div>
        )}
      </nav>
    </header>
  );
};

export default MainNavigation;
