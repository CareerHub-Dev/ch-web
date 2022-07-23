import CompanyInfoBlock from './CompanyInfoBlock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import LinkButton from '@/components/ui/LinkButton';
import CompanyLogo from './CompanyLogo';
import classes from './CompanyCard.module.scss';

const UsersIcon = <FontAwesomeIcon icon={faUsers} />;
const BriefcaseIcon = <FontAwesomeIcon icon={faBriefcase} />;

const CompanyCard: React.FC<{
  company: {
    id: string;
    companyName: string;
    companyDescription: string;
    companyLogo: string;
    amountSubscribers: number;
    amountActiveJobOffers: number;
  };
}> = ({ company }) => {
  return (
    <div className={classes.root}>
      <div className={classes['card-header']}>
        <CompanyLogo companyId={company.id} companyName={company.companyName} />
        <div className={classes['info-column']}>
          <CompanyInfoBlock
            value={company.amountSubscribers.toString()}
            icon={UsersIcon}
          />
          <CompanyInfoBlock
            value={company.amountActiveJobOffers.toString()}
            icon={BriefcaseIcon}
          />
        </div>
      </div>

      <div className={classes['card-body']}>
        <h1 className={classes.name}>{company.companyName}</h1>
        <p className={classes.description}>{company.companyDescription}</p>
        <LinkButton
          style="light-blue-primary"
          link={`/companies/${company.id}`}
        >
          Більше
        </LinkButton>
      </div>
    </div>
  );
};
export default CompanyCard;
