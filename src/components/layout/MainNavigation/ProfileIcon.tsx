import Link from 'next/link';
import Image from 'next/image';

import classes from './ProfileIcon.module.scss';

const ProfileIcon: React.FC<{ src?: string }> = ({
  src = 'https://i.imgur.com/TCemmcW.png',
}) => {
  return (
    <Link href={'/my-dashboard/profile'}>
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
