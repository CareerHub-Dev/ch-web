import Image from 'next/image';
import Link from 'next/link';
import { getImage } from '@/lib/api/image';
import defaultJobOfferLogo from '@/resources/images/general.jpg';
import format from 'date-fns/format';

import { type CompanyJobOffer } from '@/lib/api/company/schemas';

const CompanyJobOffersListItem = ({ item }: { item: CompanyJobOffer }) => {
  const jobOfferPreviewSource = item.image
    ? getImage(item.image)
    : defaultJobOfferLogo;
  const readableEndDate = format(new Date(item.endDate), 'dd.MM.yyyy');

  return (
    <div className="p-4 rounded-xl border border-x-primaryGray w-full flex gap-4 bg-lightGray">
      <Image
        src={jobOfferPreviewSource}
        width={60}
        height={60}
        className="rounded-xl inline-block overflow-hidden aspect-square"
        alt="JobOffer preview"
      />
      <div className="flex-auto">
        <div className="flex items-center justify-between flex-wrap">
          <Link
            href={`/job-offers/${item.id}`}
            className="cursor-pointer hover:text-primaryBlue hover:underline md:text-lg"
          >
            {item.title}
          </Link>
        </div>
        <p className="text-xs text-darkGray mt-1">{`Діє до ${readableEndDate}`}</p>
      </div>
    </div>
  );
};

export default CompanyJobOffersListItem;
