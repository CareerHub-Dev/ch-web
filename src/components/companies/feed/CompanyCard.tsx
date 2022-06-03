import Image from 'next/image';
import CompanyInfoBlock from './CompanyInfoBlock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import LinkButton from '@/components/ui/LinkButton';
import classes from './CompanyCard.module.scss';

type Props = {
  company: {
    companyId: string;
    companyName: string;
    companyDescription: string;
    companyLogo: string;
    totalSubscribers: number;
    totalJobOffers: number;
  };
};

const UsersIcon = <FontAwesomeIcon icon={faUsers} />;
const BriefcaseIcon = <FontAwesomeIcon icon={faBriefcase} />;

const CompanyCard = ({ company }: Props) => {
  return (
    <div className={classes.root}>
      <div className={classes['card-header']}>
        <Image
          className={classes.logo}
          src={company.companyLogo}
          width={400}
          height={400}
          alt={company.companyName}
        />
        <div className={classes['info-column']}>
          <CompanyInfoBlock
            value={company.totalSubscribers.toString()}
            icon={UsersIcon}
          />
          <CompanyInfoBlock
            value={company.totalJobOffers.toString()}
            icon={BriefcaseIcon}
          />
        </div>
      </div>

      <div className={classes['card-body']}>
        <h1 className={classes.name}>{company.companyName}</h1>
        <p className={classes.description}>{company.companyDescription}</p>
        <LinkButton
          style="light-blue-primary"
          link={`/companies/${company.companyId}`}
        >
          Більше
        </LinkButton>
      </div>
    </div>
  );
};
export default CompanyCard;
