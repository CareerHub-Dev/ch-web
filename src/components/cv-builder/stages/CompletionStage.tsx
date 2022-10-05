import { useSelector } from 'react-redux';
import { selectEntireCVState } from '../../../context/cv-constructor';
import Link from 'next/link';

import classes from './CompletionStage.module.scss';

const CompletionStage: React.FC = () => {
  const cvState = useSelector(selectEntireCVState);
  console.log(cvState);

  return (
    <div className={classes.card}>
      <i className="far fa-check-circle" />
      <p>Вітаємо, резюме успішно створено! </p>
      <section className={classes.actions}>
        <button>Як я можу покращити своє резюме?</button>
        <Link href="/">Завантажити файл</Link>
        <Link href="/cvs">Створити ще одне резюме</Link>
      </section>
    </div>
  );
};
export default CompletionStage;
