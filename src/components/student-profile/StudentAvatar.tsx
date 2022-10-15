import Image from 'next/future/image';
import useImageQuery from '@/hooks/useImageQuery';

const StudentAvatar = ({ photoId }: { photoId: string | null }) => {
  const { data } = useImageQuery({
    imageId: photoId as string,
    enabled: !!photoId,
  });
  const imageSource = data ?? '/default-avatar.png';

  return (
    <Image
      src={imageSource}
      alt="Avatar"
      height="128"
      width="128"
      className="rounded-full h-[128px] w-[128px] shadow-md"
    />
  );
};
export default StudentAvatar;
