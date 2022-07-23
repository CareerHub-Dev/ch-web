import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import NavbarHamburger from './NavbarHamburger';
import NavMenu from './NavMenu';
import classes from './style.module.scss';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
const AdminNavbar = () => {
  const router = useRouter();
  const auth = useAuth();
  const [isActive, setIsActive] = React.useState(false);

  const handleHamburgerClick = () => {
    setIsActive(!isActive);
  };

  const handleLogoutClick = () => {
    auth.logout();
    router.replace('/');
  };

  return (
    <>
      <div className={classes.hamburger}>
        <NavbarHamburger
          onClick={handleHamburgerClick}
          theme={isActive ? 'dark' : 'light'}
          isOpen={isActive}
        />
      </div>
      <nav className={`${classes.root} ${isActive && classes.isActive}`}>
        <div className={classes.user}>
          <div className={classes.user__avatar}>
            <img
              src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
              alt=""
            />
          </div>
          <p className={classes.username}>Yevhenii Bakhmat</p>
        </div>

        <div className={classes.splitter} />

        <div className={classes.menu}>
          <NavMenu />
        </div>

        <button className={classes.logout} onClick={handleLogoutClick}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </button>
      </nav>
    </>
  );
};

export default AdminNavbar;
