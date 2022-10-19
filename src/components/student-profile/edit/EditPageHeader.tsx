import Image from 'next/future/image';
import Link from 'next/link';

const EditPageHeader = ({
  avatarData,
  avatarLoading,
  groupName,
  firstName,
  lastName,
}: {
  avatarData: string | null;
  avatarLoading: boolean;
  firstName: string;
  lastName: string;
  groupName: string;
}) => {
  const imageSource = avatarData ?? '/default-avatar.png';
  return (
    <header className="flex flex-items-center flex-justify-between mt-4 col-span-2">
      <div className="flex flex-items-center mb-2 mb-md-0">
        <span className="inline-block rounded-full mr-3 bg-primaryGray h-[48px] w-[48px]">
          {!avatarLoading && (
            <Image
              src={imageSource}
              width={48}
              height={48}
              alt={'Твій аватар'}
              className="rounded-full overflow-hidden aspect-square"
            />
          )}
        </span>

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
