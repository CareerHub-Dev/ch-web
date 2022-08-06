import { getReadableDateFromString } from '@/lib/util';
import Image from 'next/image';
import LinkButton from '@/components/ui/LinkButton';
import DateIcon from '@/components/ui/icons/DateIcon';
import ArrowRightIcon from '@/components/ui/icons/ArrowRightIcon';
import CompanyLink from './CompanyLink';
import JobOfferTags from '../common/JobOfferTags';

import classes from './JobOfferItem.module.scss';

const JobOfferItem: React.FC<{ item: JobOffersFeed.JobOffer }> = ({ item }) => {
  const { id, title, endDate, companyName, companyId, tags } = item;
  const humanReadableExpirationDate = getReadableDateFromString(endDate);
  const exploreLink = `/offers/${id}`;

  return (
    <li className={classes.item}>
      <Image src={'/general.jpg'} alt={title} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <CompanyLink companyId={companyId} companyName={companyName} />
          <div className={classes.date}>
            <DateIcon />
            <p>
              {'Закінчується: '}
              <time>{humanReadableExpirationDate}</time>
            </p>
          </div>
          {tags.length !== 0 && <JobOfferTags tags={tags} variant="dark" />}
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
