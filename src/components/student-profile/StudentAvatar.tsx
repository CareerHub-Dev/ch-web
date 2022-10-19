import Image from 'next/future/image';
import useImageQuery from '@/hooks/useImageQuery';

import cn from 'classnames';

const containerClass = 'rounded-full h-[128px] w-[128px]';

const StudentAvatar = ({ photoId }: { photoId: string | null }) => {
  const q = useImageQuery({
    imageId: photoId as string,
    enabled: !!photoId,
  });
  const imageSource = q.data ?? '/default-avatar.png';
  const imageMightBeLoading = !!photoId && q.isLoading;

  return (
    <span className={cn(containerClass, 'bg-primaryGray shadow-md')}>
      {!imageMightBeLoading && (
        <Image
          src={imageSource}
          priority={true}
          alt="Avatar"
          height="128"
          width="128"
          className={containerClass}
        />
      )}
    </span>
  );
};
export default StudentAvatar;
