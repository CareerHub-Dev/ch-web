import type { JobOffersFeedItemProps } from '@/models/JobOffer';
import { getReadableDateFromString } from '@/lib/util';
import Image from 'next/image';
import LinkButton from '@/components/ui/LinkButton';
import DateIcon from '@/components/ui/icons/DateIcon';
import MailAtIcon from '@/components/ui/icons/MailAtIcon';
import ArrowRightIcon from '@/components/ui/icons/ArrowRightIcon';
import classes from './JobOfferItem.module.scss';
import TagsSection from './TagsSection';

const JobOfferItem = ({
  id,
  companyName,
  title,
  startDate,
  endDate,
  image,
  tags,
}: JobOffersFeedItemProps) => {
  const humanReadableCreationDate = getReadableDateFromString(startDate);
  const humanReadableExpirationDate = getReadableDateFromString(endDate);
  const displayedTimeRange = `${humanReadableCreationDate} - ${humanReadableExpirationDate}`;

  const exploreLink = `/offers/${id}`;

  return (
    <li className={classes.item}>
      <Image src={image} alt={title} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.address}>
            <MailAtIcon />
            <address>{companyName}</address>
          </div>
          <div className={classes.date}>
            <DateIcon />
            <time>{displayedTimeRange}</time>
          </div>
          {tags.length !== 0 && <TagsSection tags={tags} />}
        </div>
        <div className={classes.actions}>
          <LinkButton link={exploreLink} style="light-blue-primary">
            <span>Більше</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </LinkButton>
        </div>
      </div>
    </li>
  );
};

export default JobOfferItem;
