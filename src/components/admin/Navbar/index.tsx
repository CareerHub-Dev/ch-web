import React from 'react';
import NavMenu from './NavMenu';
import classes from './style.module.scss';

const AdminNavbar = () => {
  return (
    <nav className={classes.root}>
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
    </nav>
  );
};

export default AdminNavbar;
