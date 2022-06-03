import useSWR from 'swr';
import { useState, useEffect } from 'react';
import useInput from '@/hooks/useInput';
import Image from 'next/image';
import Card from '../ui/Card';
import Button from '../ui/Button';
import FormImageUpload from '../ui/form/FormImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import classes from './StudentProfile.module.scss';

const DUMMY_DATA = {
  firstName: 'Сергій',
  lastName: 'Бурцев',
  email: 'serii.burtsev@nure.ua',
  group: 'ПЗПІи-19-1',
  avatar: 'https://picsum.photos/200/300',
};

const StudentProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const uploadedImage = useInput();

  const student = DUMMY_DATA;
  const displayedName = `${student.firstName} ${student.lastName}`;

  const imageLoadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    uploadedImage.valueChangeHandler(event);
  };

  const editButtonClickHandler = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <section className={classes.wrapper}>
      <div id="generalInfo">
        <h1 className={classes.name}>{displayedName}</h1>
        <Card className={classes.card}>
          <span className={classes.info}>
            <FontAwesomeIcon icon={faEnvelope} />
            <span>{student.email}</span>
          </span>
          <span className={classes.info}>
            <FontAwesomeIcon icon={faUser} />
            <span>{student.group}</span>
          </span>
        </Card>
      </div>
      <div id="Avatar" className={classes.avatar}>
        {isEditMode ? (
          <FormImageUpload
            onChange={imageLoadHandler}
            onRemove={uploadedImage.reset}
            id="avatar"
            data={uploadedImage.value}
            alt="loadedAvatar"
          />
        ) : (
          <Image
            src={student.avatar}
            alt="user-profile"
            width={300}
            height={300}
          />
        )}
        <Button
          id="editButton"
          customClasses={classes.button}
          onClick={editButtonClickHandler}
        >
          {isEditMode ? 'Зберегти' : 'Редагувати'}
        </Button>
      </div>
    </section>
  );
};
export default StudentProfile;
