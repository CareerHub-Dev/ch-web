import {
  selectIsAssistEnabled,
  selectPhoto,
  setPhoto,
} from '@/store/cv-constructor';
import useAppDispatch from '@/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { loadPhoto } from '@/store/cv-constructor-actions';
import store from '@/store';
import FormImageUpload from '@/components/ui/form/FormImageUpload';
import Card from '@/components/ui/Card';
import AssistantTip from './AssistantTip';

import classes from './Stage.module.scss';

type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

const Stage2 = () => {
  const photo = useSelector(selectPhoto);
  const isAssistEnabled = useSelector(selectIsAssistEnabled);

  const dispatch = useAppDispatch();

  const photoChangeHandler = (event: InputChangeEvent) => {
    store.dispatch(loadPhoto(event));
  };

  return (
    <>
      <Card className={classes.body}>
        <h1>Додати фотографію (опціональне):</h1>
        <FormImageUpload
          id="photo"
          label="Завантажити фото"
          data={photo.value}
          alt="Твоє Фото"
          onChange={photoChangeHandler}
          onRemove={() => dispatch(setPhoto(''))}
        />
      </Card>

      {isAssistEnabled && (
        <AssistantTip>
          <p>Чим може стати у нагоді фотографія в резюме?</p>
          <ul>
            <li>Деякі вакансії вимагають фотографію у резюме;</li>
            <li>
              Для деяких компаній важливо, щоб працівник виглядав
              представницько;
            </li>
            <li>{`Рекрутерам буде легше вас запам'ятати;`}</li>
          </ul>
          <br />
          <p>
            {`Якщо вирішив додавати фотографію, то переконайся, що вона виглядає
            доречною і що ти на ній схожий на самого себе :)`}
          </p>
        </AssistantTip>
      )}
    </>
  );
};

export default Stage2;
