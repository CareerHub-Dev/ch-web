import { useBoolean } from 'usehooks-ts';
import Image from 'next/future/image';
import { getImage } from '@/lib/api/image';

import cn from 'classnames';

const StudentAvatar = ({ photoId }: { photoId: string | null }) => {
  const imageSource = photoId ? getImage(photoId) : '/default-avatar.png';
  const imageMightBeLoading = useBoolean(true);

  return (
    <Image
      src={imageSource}
      priority={true}
      alt="Avatar"
      height="128"
      width="128"
      className={cn(
        'rounded-full h-[128px] w-[128px]',
        imageMightBeLoading.value && 'animate-pulse'
      )}
      onLoadingComplete={imageMightBeLoading.setFalse}
    />
  );
};
export default StudentAvatar;
