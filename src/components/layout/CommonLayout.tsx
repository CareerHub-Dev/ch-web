import MainNavigation from './MainNavigation';
import Background from './Background';
import classes from './CommonLayout.module.scss';
import { useRouter } from 'next/router';
const Layout: React.FC = ({ children }) => {
  const checkURL = () => {
    return useRouter().pathname.includes('admin');
  };

  return (
    <>
      <Background />
      {!checkURL() && <MainNavigation />}
      <main className={classes.main}>{children}</main>
    </>
  );
};

export default Layout;
