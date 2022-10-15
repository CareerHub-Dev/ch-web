
import useSelfStudentQuery from "@/hooks/useStudentSelfQuery";
import Image from "next/future/image";

const UserMenuAvatar = () => {
  const { data } = useSelfStudentQuery();
  const imageSource = '/default-avatar.png';

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