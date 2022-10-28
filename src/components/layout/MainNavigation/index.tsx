const MainNavigation = () => {
  // const router = useRouter();
  // const auth = useSession();
  // const [isBurgerOpened, setIsBurgerOpened] = useState(false);
  // const { width } = useWindowSize();

  // const isLoggedIn = auth.isLoggedIn;
  // const isStudent = isLoggedIn && auth.session?.role === 'Student';
  // const isCompany = isLoggedIn && auth.session?.role === 'Company';
  // const isPhoneScreen = width < 600;
  // const profileLink = isStudent ? '/my-profile' : '/my-dashboard';

  // const burgerOpenHandler = () => {
  //   setIsBurgerOpened((prevState) => !prevState);
  // };

  // const logoutClickHandler = () => {
  //   auth.logout();
  // };

  // const loginClickHandler = () => {
  //   router.replace('/auth/login');
  // };

  // return (
  //   <header>
  //     <nav id="navbar" className={classes.nav}>
  //       <div id="navLogo" className={classes.logo}>
  //         <Link href={'/'}>CareerHub</Link>
  //       </div>
  //       <ul
  //         className={cn(classes.list, {
  //           [classes.active]: isPhoneScreen && isBurgerOpened,
  //         })}
  //       >
  //         <li>
  //           <Link href={'/'}>Головна</Link>
  //         </li>
  //         {isStudent ? (
  //           <>
  //             <li
  //               className={cn(
  //                 router.pathname.includes('/companies') &&
  //                   classes['active-link']
  //               )}
  //             >
  //               <Link href={'/companies'}>Компанії</Link>
  //             </li>
  //             <li
  //               className={cn(
  //                 router.pathname.includes('/offers') && classes['active-link']
  //               )}
  //             >
  //               <Link href={'/offers'}>Робота</Link>
  //             </li>
  //           </>
  //         ) : isCompany ? (
  //           <>
  //             <li
  //               className={cn(
  //                 router.pathname.includes('/cvs') && classes['active-link']
  //               )}
  //             >
  //               <Link href={'/cvs'}>Резюме</Link>
  //             </li>
  //             <li
  //               className={cn(
  //                 router.pathname.includes('/offers/add') &&
  //                   classes['active-link']
  //               )}
  //             >
  //               <Link href={'/offers/add'}>Додати вакансію</Link>
  //             </li>
  //           </>
  //         ) : null}
  //       </ul>
  //       {isLoggedIn ? (
  //         <>
  //           <ProfileIcon link={profileLink} />
  //           <div className={classes['nav-user-menu']}>
  //             <Button
  //               id="logoutButton"
  //               className={cn('button-light', {
  //                 [classes.button]: isPhoneScreen,
  //               })}
  //               onClick={logoutClickHandler}
  //             >
  //               {isPhoneScreen ? <SigOutIcon /> : <span>Вийти</span>}
  //             </Button>
  //           </div>
  //         </>
  //       ) : (
  //         <LinkButton onClick={loginClickHandler}>Увійти</LinkButton>
  //       )}
  //       {isPhoneScreen && (
  //         <div id="burgerButton" className={classes.burger}>
  //           <BurgerMenu
  //             onClick={burgerOpenHandler}
  //             isClicked={isBurgerOpened}
  //           />
  //         </div>
  //       )}
  //     </nav>
  //   </header>
  // );
};

export default MainNavigation;
