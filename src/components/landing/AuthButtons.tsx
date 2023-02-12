import useSession from "@/hooks/useSession";
import { useRouter } from "next/router";

import classes from "./AuthButtons.module.scss";

const AuthButtons = () => {
  const { status } = useSession();
  const router = useRouter();

  const routingHandler = (path: string) => (event: any) => {
    event.preventDefault();
    router.push(path);
  };

  return status === "unauthenticated" ? (
    <section className={classes.actions}>
      <button
        className={classes.register}
        type="button"
        onClick={routingHandler("/auth/register")}
      >
        Зареєструватися
      </button>
      <button
        className={classes.register}
        type="button"
        onClick={routingHandler("/auth/login")}
      >
        Увійти
      </button>
    </section>
  ) : null;
};
export default AuthButtons;
