import MainNavigation from './MainNavigation';
import Background from './Background';
import { type ReactNode } from 'react';
import classes from './CommonLayout.module.scss';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Background />
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </>
  );
};

export default Layout;
