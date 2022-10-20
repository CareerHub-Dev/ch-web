import useImageQuery from '@/hooks/useImageQuery';
import Image from 'next/future/image';
import Link from 'next/link';

const SubscriptionCompanyItem = ({
  company,
  isSelf,
}: {
  company: any;
  isSelf: boolean;
}) => {
  const q = useImageQuery({
    imageId: company.logoId,
  });

  return (
    <div className="p-4 rounded-xl border border-x-primaryGray w-full flex gap-4 bg-lightGray">
      <Image
        src={q.data ?? '/company-dummy-logo.png'}
        width={60}
        height={60}
        className="rounded-xl inline-block overflow-hidden aspect-square"
        alt="Company logo"
      />
      <div className="flex-auto">
        <div className="flex items-center justify-between flex-wrap">
          <Link href={`/company/${company.id}`} passHref>
            <a className="cursor-pointer hover:text-primaryBlue hover:underline md:text-lg">
              {company.name}
            </a>
          </Link>
          {isSelf && (
            <button className="text-xs text-primaryRed font-semibold bg-white py-1 px-2 rounded-full border-2 border-primaryRed">
              Відписатися
            </button>
          )}
        </div>
        <p className="text-xs text-darkGray mt-1">{company.motto}</p>
      </div>
    </div>
  );
};
export default SubscriptionCompanyItem;
