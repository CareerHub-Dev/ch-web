import Link from "next/link";
import classes from "@/styles/404.module.scss";

const NotFound = () => {
  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.text404}>
          <h2>4</h2>
          <h2>0</h2>
          <h2>4</h2>
        </div>
        <div>
          <h1>Упс! Сторінка за адресою не знайдена...</h1>
          <div className={classes.row}>
            <Link href="/" passHref>
              <div className={classes.button}>
                <button>На головну</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
