import { getReadableDateFromString } from '@/lib/util';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { AtSymbolIcon } from '@heroicons/react/20/solid';
import { AcademicCapIcon } from '@heroicons/react/24/solid';
import { BriefcaseIcon } from '@heroicons/react/24/outline';
import InfoItem from './InfoItem';
import LinkButton from '@/components/ui/LinkButton';
import SubscriptionButton from './SubscriptionButton';
import SubscribersInfo from './SubscribersInfo';
import Link from 'next/link';
import AppliedCVsInfo from './AppliedCVsInfo';
import JobOfferTags from '../common/JobOfferTags';

import classes from './GeneralInfo.module.scss';

const GeneralInfo: React.FC<{
  jobOfferId: string;
  companyName: string;
  companyId: string;
  startDate: string;
  endDate: string;
  workFormat: string;
  experienceLevel: string;
  tags: Tag[];
}> = ({
  jobOfferId,
  companyName,
  companyId,
  startDate,
  endDate,
  tags,
  workFormat,
  experienceLevel,
}) => {
  const readableStartDate = getReadableDateFromString(startDate);
  const readableEndDate = getReadableDateFromString(endDate);

  return (
    <section className={classes.info}>
      <div className={classes.list}>
        <InfoItem icon={<AtSymbolIcon />}>
          <Link href={`/companies/${companyId}`}>{companyName}</Link>
        </InfoItem>
        <InfoItem icon={<CalendarIcon />}>
          <span>
            <time>{`${readableStartDate} - ${readableEndDate}`}</time>
          </span>
        </InfoItem>
        <SubscribersInfo jobOfferId={jobOfferId} />
        <AppliedCVsInfo jobOfferId={jobOfferId} />
        <InfoItem icon={<AcademicCapIcon />}>
          <span>{`Рівень: ${experienceLevel}`}</span>
        </InfoItem>
        <InfoItem icon={<BriefcaseIcon />}>
          <span>{`Формат роботи: ${workFormat}`}</span>
        </InfoItem>
        <JobOfferTags tags={tags} />
        <SubscriptionButton jobOfferId={jobOfferId} />
        <LinkButton style="lgbt" additionalClasses={classes.btn}>
          {'Подати Резюме'}
        </LinkButton>
      </div>
    </section>
  );
};
export default GeneralInfo;
