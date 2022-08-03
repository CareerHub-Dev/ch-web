import { useQuery } from '@tanstack/react-query';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import classes from './StudentAvatar.module.scss';

const StudentAvatar: React.FC<{
  photoId?: string;
}> = ({ photoId }) => {
  const { accessToken } = useAuth();
  const photoIsSet = !!photoId;

  return (
    <div className={classes.avatar}>
      <Image
        src={photoIsSet ? photoId : '/default-avatar.png'}
        alt="user-profile"
        width={300}
        height={300}
      />
    </div>
  );
};
export default StudentAvatar;
