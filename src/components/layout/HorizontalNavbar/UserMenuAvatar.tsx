import useSelfStudentQuery from '@/hooks/useStudentSelfQuery';
import { getImage } from '@/lib/api/image';
import { useBoolean } from 'usehooks-ts';
import Image from 'next/future/image';
import cn from 'classnames';

const UserMenuAvatar = () => {
  const { data: studentData, isLoading: loadingStudentData } =
    useSelfStudentQuery();
  const imageMightBeLoading = useBoolean(true);
  const imageSource = studentData?.photo
    ? getImage(studentData.photo)
    : '/default-avatar.png';

  return (
    <span
      className={cn(
        'rounded-full h-8 w-8 inline-flex bg-primaryGray',
        (loadingStudentData || imageMightBeLoading.value) && 'animate-pulse'
      )}
    >
      {!loadingStudentData && (
        <Image
          width={32}
          height={32}
          src={imageSource}
          alt="Ваш аватар"
          className="rounded-full overflow-hidden aspect-square"
          onLoadingComplete={imageMightBeLoading.setFalse}
        />
      )}
    </span>
  );
};
export default UserMenuAvatar;
