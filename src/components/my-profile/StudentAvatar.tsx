import Image from 'next/image';
import defaultAvatar from '@/resources/images/default-avatar.png';
import classes from './StudentAvatar.module.scss';

const StudentAvatar: React.FC<{
  photoId?: string | null;
}> = ({ photoId }) => {
  const photoIsSet = !!photoId;

  return (
    <div className={classes.avatar}>
      <Image
        src={photoIsSet ? photoId : defaultAvatar}
        alt="user-profile"
        width={300}
        height={300}
      />
    </div>
  );
};
export default StudentAvatar;
