import Image from 'next/future/image';

const StudentAvatar = () => {
  return (
    <Image
      src="/default-avatar.png"
      alt="Avatar"
      height="128"
      width="128"
      className="rounded-full h-[128px] w-[128px] shadow-md"
    />
  );
};
export default StudentAvatar;
