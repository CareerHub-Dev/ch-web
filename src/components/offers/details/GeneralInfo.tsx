import Image from 'next/image';
import { getReadableDateFromString } from '@/lib/util';
import DateIcon from '@/components/ui/icons/DateIcon';
import MailAtIcon from '@/components/ui/icons/MailAtIcon';
import InfoItem from './InfoItem';
import PeopleIcon from '@/components/ui/icons/PeopleIcon';
import LinkButton from '@/components/ui/LinkButton';
import CheckIcon from '@/components/ui/icons/CheckIcon';
import classes from './GeneralInfo.module.scss';
import SubscribersInfo from './SubscribersInfo';

const GeneralInfo: React.FC<{
  jobOfferId: string;
  companyName: string;
  startDate: string;
  endDate: string;
}> = ({ jobOfferId, companyName, startDate, endDate }) => {
  const readableStartDate = getReadableDateFromString(startDate);
  const readableEndDate = getReadableDateFromString(endDate);

  const subscriptionHandler = () => {};

  const subscriptionButton = false ? ( // TODO - implement subscription button
    <LinkButton
      onClick={subscriptionHandler}
      style="dark-blue-secondary"
      additionalClasses={classes.btn}
    >
      <span className={classes.span}>
        <CheckIcon />
        {'Підписаний'}
      </span>
    </LinkButton>
  ) : (
    <LinkButton
      onClick={subscriptionHandler}
      style="light-blue-primary"
      additionalClasses={classes.btn}
    >
      {'Підписатися'}
    </LinkButton>
  );

  return (
    <section className={classes.info}>
      <div className={classes.image}>
        <Image
          src={'https://i.imgur.com/XqY6xjq.png'}
          alt={'Зображення до вакансії'}
          width={400}
          height={400}
        />
      </div>
      <ul className={classes.list}>
        <InfoItem icon={MailAtIcon}>
          <address>{companyName}</address>
        </InfoItem>
        <InfoItem icon={DateIcon}>
          <span>
            <time>{`${readableStartDate} - ${readableEndDate}`}</time>
          </span>
        </InfoItem>
        <SubscribersInfo jobOfferId={jobOfferId} />
        {subscriptionButton}
        <LinkButton style="lgbt" additionalClasses={classes.btn}>
          {'Подати Резюме'}
        </LinkButton>
      </ul>
    </section>
  );
};
export default GeneralInfo;
