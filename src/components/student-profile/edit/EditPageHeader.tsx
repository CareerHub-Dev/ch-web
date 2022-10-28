import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

const EditPageHeader = ({
  avatarData,
  groupName,
  firstName,
  lastName,
}: {
  avatarData: string | StaticImageData;
  firstName: string;
  lastName: string;
  groupName: string;
}) => {
  return (
    <header className="flex flex-items-center flex-justify-between mt-4 col-span-2">
      <div className="flex flex-items-center mb-2 mb-md-0">
        <span className="inline-block rounded-full mr-3 bg-primaryGray h-[48px] w-[48px]">
          <Image
            src={avatarData}
            width={48}
            height={48}
            alt={'Твій аватар'}
            className="rounded-full overflow-hidden aspect-square"
          />
        </span>

        <div className="flex-auto">
          <Link
            href="/my-profile"
            className="text-xl font-bold hover:underline cursor-pointer"
          >
            {`${firstName} ${lastName}`}
          </Link>
          <p className="text-sm text-darkGray">{groupName}</p>
        </div>
      </div>
    </header>
  );
};
export default EditPageHeader;
