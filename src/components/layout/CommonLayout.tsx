import MainNavigation from './MainNavigation';
import Background from './Background';
import classes from './CommonLayout.module.scss';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Background />
      <MainNavigation />
      <main className={classes.main}>{children}</main>
    </>
  );
};

export default Layout;
