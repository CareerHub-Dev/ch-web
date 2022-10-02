import Image from 'next/image';

const StudentAvatar = () => {
  return (
    <Image
      src="/default-avatar.png"
      alt="Avatar"
      height="128"
      width="128"
      className="rounded-full w-[128px] h-[128px] shadow-md"
    />
  );
};
export default StudentAvatar;
