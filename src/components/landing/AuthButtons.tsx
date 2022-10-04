import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';

import classes from './AuthButtons.module.scss';

const AuthButtons = () => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const routingHandler = (path: string) => (event: any) => {
    event.preventDefault();
    router.push(path);
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <section className={classes.actions}>
      <button
        className={classes.register}
        type="button"
        onClick={routingHandler('/auth/register')}
      >
        Зареєструватися
      </button>
      <button
        className={classes.register}
        type="button"
        onClick={routingHandler('/auth/login')}
      >
        Увійти
      </button>
    </section>
  );
};
export default AuthButtons;
