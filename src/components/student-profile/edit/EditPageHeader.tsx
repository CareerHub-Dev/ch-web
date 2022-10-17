import Image from 'next/future/image';
import Link from 'next/link';

const EditPageHeader = ({
  avatarData,
  groupName,
  firstName,
  lastName,
}: {
  avatarData: string | null;
  firstName: string;
  lastName: string;
  groupName: string;
}) => {
  const imageSource = avatarData ?? '/default-avatar.png';
  return (
    <header className="flex flex-items-center flex-justify-between mt-4 col-span-2">
      <div className="flex flex-items-center mb-2 mb-md-0">
        <Image
          src={imageSource}
          width={48}
          height={48}
          alt={'Твій аватар'}
          className="inline-block rounded-full mr-3"
        />
        <div className="flex-auto">
          <Link href="/my-profile" passHref>
            <h2 className="text-xl font-bold hover:underline cursor-pointer">
              <a>{`${firstName} ${lastName}`}</a>
            </h2>
          </Link>
          <p className="text-sm text-darkGray">{groupName}</p>
        </div>
      </div>
    </header>
  );
};
export default EditPageHeader;
