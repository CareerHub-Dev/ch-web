import Link from 'next/link';
import classes from '@/styles/404.module.scss';

const InternalError = () => {
  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.text404}>
          <h2>5</h2>
          <h2>0</h2>
          <h2>0</h2>
        </div>
        <div>
          <h1>Упс! Серверна помилка...</h1>
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
export default InternalError;
