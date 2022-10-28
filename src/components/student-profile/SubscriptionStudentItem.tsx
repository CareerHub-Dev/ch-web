import { type StudentSubscription } from '@/lib/api/student/schemas';
import { getImage } from '@/lib/api/image';
import Image from 'next/image';
import Link from 'next/link';

const SubscriptionStudentItem = ({
  item,
  onSelect,
}: {
  item: StudentSubscription;
  onSelect?: () => void;
}) => {
  const studentFullName = `${item.firstName} ${item.lastName}`;
  const studentAvatarSource = item.photo
    ? getImage(item.photo)
    : '/company-dummy-logo.png';

  return (
    <div className="p-4 rounded-xl border border-x-primaryGray w-full flex gap-4 bg-lightGray">
      <Image
        src={studentAvatarSource}
        width={60}
        height={60}
        className="rounded-xl inline-block overflow-hidden aspect-square"
        alt="Company logo"
      />
      <div className="flex-auto">
        <div className="flex items-center justify-between flex-wrap">
          <Link
            href={`/student-profile/${item.id}`}
            className="cursor-pointer hover:text-primaryBlue hover:underline md:text-lg"
          >
            {studentFullName}
          </Link>
          {onSelect && (
            <button
              className="text-xs text-primaryRed font-semibold bg-white py-1 px-2 rounded-full border border-primaryRed"
              onClick={onSelect}
            >
              Відписатися
            </button>
          )}
        </div>
        <p className="text-xs text-darkGray mt-1">{item.studentGroup.name}</p>
      </div>
    </div>
  );
};
export default SubscriptionStudentItem;
