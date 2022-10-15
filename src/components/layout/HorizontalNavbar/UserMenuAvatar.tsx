import useSelfStudentQuery from '@/hooks/useStudentSelfQuery';
import useImageQuery from '@/hooks/useImageQuery';
import Image from 'next/future/image';

const UserMenuAvatar = () => {
  const { data: studentData } = useSelfStudentQuery();
  const { data: imageData } = useImageQuery({
    imageId: studentData?.photoId,
    enabled: !!studentData?.photoId,
  });

  const imageSource = imageData ?? '/default-avatar.png';

  return (
    <Image
      width={32}
      height={32}
      src={imageSource}
      alt="My profile avatar"
      className="inline-flex rounded-full overflow-hidden aspect-square bg-gray-300 h-8 w-8"
    />
  );
};
export default UserMenuAvatar;
