import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProfileData, selectProfilePhoto } from '@/store/student';
import useInput from '@/hooks/useInput';
import Image from 'next/image';
import Card from '../ui/Card';
import Button from '../ui/Button';
import FormImageUpload from '../ui/form/FormImageUpload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import classes from './StudentProfile.module.scss';

const StudentProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const uploadedImage = useInput();

  const profileData = useSelector(selectProfileData);
  const displayedName = `${profileData.firstName} ${profileData.lastName}`;

  const profilePhoto = useSelector(selectProfilePhoto);
  const profilePhotoIsSet = profilePhoto.length !== 0;

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
