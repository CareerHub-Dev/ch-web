import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchStudent } from '@/lib/api/remote/student';
import useInput from '@/hooks/useInput';
import Image from 'next/image';
import Card from '../ui/Card';
import Button from '../ui/Button';
import FormImageUpload from '../ui/form/FormImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import classes from './StudentProfile.module.scss';
import LoadingSpinner from '../ui/LoadingSpinner';

const StudentProfile = () => {
  const { accessToken, accountId } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const uploadedImage = useInput();
  const studentQuery = useQuery(
    ['student', accountId, accessToken],
    fetchStudent({
      accountId: accountId as string,
      accessToken: accessToken as string,
    }),
    {
      enabled: !!accessToken && !!accountId,
      onError: (error: any) =>
        alert(error.message || 'Помилка звернення до серверу'),
    }
  );
  if (studentQuery.isLoading) {
    return <LoadingSpinner />;
  }
  if (studentQuery.isError) {
    return <div>Помилка звернення до серверу</div>;
  }
  console.log(studentQuery.data);
  // TODO: make it work
  const profileData: any = {};
  const profilePhoto: any = {};
  const displayedName = ``;
  const profilePhotoIsSet = 0 !== 0;

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
            <span>{profileData.email}</span>
          </span>
          <span className={classes.info}>
            <FontAwesomeIcon icon={faUser} />
            <span>{profileData.groupId}</span>
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
            src={
              profilePhotoIsSet
                ? profilePhoto
                : 'https://i.imgur.com/TCemmcW.png'
            }
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
