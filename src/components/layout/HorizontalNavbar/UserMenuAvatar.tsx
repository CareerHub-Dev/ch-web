import useSelfStudentQuery from '@/hooks/useStudentSelfQuery';
import useImageQuery from '@/hooks/useImageQuery';
import Image from 'next/future/image';

const UserMenuAvatar = () => {
  const { data: studentData, isLoading: loadingStudentData } =
    useSelfStudentQuery();
  const { data: imageData, isLoading: loadingImage } = useImageQuery({
    imageId: studentData?.photoId,
  });

  const imageSource = imageData ?? '/default-avatar.png';
  const imageMightBeLoading =
    loadingStudentData || (!!studentData?.photoId && loadingImage);

  return (
    <span className="rounded-full h-8 w-8 inline-flex bg-primaryGray">
      {!imageMightBeLoading && (
        <Image
          width={32}
          height={32}
          src={imageSource}
          alt="Ваш аватар"
          className="rounded-full overflow-hidden aspect-square"
        />
      )}
    </span>
  );
};
export default UserMenuAvatar;
