import { getReadableDateFromString } from '@/lib/util';
import Image from 'next/image';
import LinkButton from '@/components/ui/LinkButton';
import DateIcon from '@/components/ui/icons/DateIcon';
import MailAtIcon from '@/components/ui/icons/MailAtIcon';
import ArrowRightIcon from '@/components/ui/icons/ArrowRightIcon';
import classes from './JobOfferItem.module.scss';
import TagsSection from './TagsSection';
import Link from 'next/link';
import CompanyLink from './CompanyLink';

const JobOfferItem: React.FC<{ item: JobOffersFeed.JobOffer }> = ({ item }) => {
  const { id, title, endDate, companyName, companyId, tags } = item;

  const humanReadableExpirationDate = getReadableDateFromString(endDate);

  const exploreLink = `/offers/${id}`;

  return (
    <li className={classes.item}>
      <Image
        src={'https://i.imgur.com/XqY6xjq.png'}
        alt={title}
        width={250}
        height={160}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <CompanyLink companyId={companyId} companyName={companyName} />
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableExpirationDate}</time>
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
