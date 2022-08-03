import Link from 'next/link';
import Image from 'next/image';

import classes from './ProfileIcon.module.scss';

const ProfileIcon: React.FC<{ src?: string }> = ({
  src = '/default-avatar.png',
}) => {
  return (
    <Link href={'/my-profile'}>
      <a>
        <Image
          width={64}
          height={64}
          className={classes.image}
          src={src}
          alt="User Icon"
        />
      </a>
    </Link>
  );
};

export default ProfileIcon;
