import Image from 'next/future/image';
import Link from 'next/link';
import type { CompanySubscription } from '@/lib/api/student/schemas';
import { getImage } from '@/lib/api/image';

const SubscriptionCompanyItem = ({
  item,
  onSelect,
}: {
  item: CompanySubscription;
  onSelect?: () => void;
}) => {
  const imageSource = item.photo
    ? getImage(item.photo)
    : '/company-dummy-logo.png';

  return (
    <div className="p-4 rounded-xl border border-x-primaryGray w-full flex gap-4 bg-lightGray">
      <Image
        src={imageSource}
        width={60}
        height={60}
        className="rounded-xl inline-block overflow-hidden aspect-square"
        alt="Company logo"
      />
      <div className="flex-auto">
        <div className="flex items-center justify-between flex-wrap">
          <Link href={`/company/${item.id}`} passHref>
            <a className="cursor-pointer hover:text-primaryBlue hover:underline md:text-lg">
              {item.name}
            </a>
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
        <p className="text-xs text-darkGray mt-1">{item.motto}</p>
      </div>
    </div>
  );
};
export default SubscriptionCompanyItem;
