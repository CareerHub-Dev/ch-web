import { getReadableDateFromString } from '@/lib/util';
import DateIcon from '@/components/ui/icons/DateIcon';
import MailAtIcon from '@/components/ui/icons/MailAtIcon';
import BriefCaseIcon from '@/components/ui/icons/BriefCaseIcon';
import EducationIcon from '@/components/ui/icons/EducationIcon';
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
        <InfoItem icon={MailAtIcon}>
          <Link href={`/companies/${companyId}`} passHref>
            <h2>{companyName}</h2>
          </Link>
        </InfoItem>
        <InfoItem icon={DateIcon}>
          <span>
            <time>{`${readableStartDate} - ${readableEndDate}`}</time>
          </span>
        </InfoItem>
        <SubscribersInfo jobOfferId={jobOfferId} />
        <AppliedCVsInfo jobOfferId={jobOfferId} />
        <InfoItem icon={EducationIcon}>
          <span>{`Рівень: ${experienceLevel}`}</span>
        </InfoItem>
        <InfoItem icon={BriefCaseIcon}>
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
