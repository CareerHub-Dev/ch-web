import CompanyInfoBlock from './CompanyInfoBlock';
import PeopleIcon from '@/components/ui/icons/PeopleIcon';
import BriefCaseIcon from '@/components/ui/icons/BriefCaseIcon';
import LinkButton from '@/components/ui/LinkButton';
import CompanyLogo from './CompanyLogo';
import classes from './CompanyCard.module.scss';

const CompanyCard: React.FC<{
  company: {
    id: string;
    companyName: string;
    companyDescription: string;
    amountSubscribers: number;
    amountActiveJobOffers: number;
    companyLogo: string;
  };
}> = ({ company }) => {
  return (
    <div className={classes.root}>
      <div className={classes['card-header']}>
        <CompanyLogo
          imageId={company.companyLogo}
          companyName={company.companyName}
        />
        <div className={classes['info-column']}>
          <CompanyInfoBlock
            value={company.amountSubscribers.toString()}
            icon={PeopleIcon}
          />
          <CompanyInfoBlock
            value={company.amountActiveJobOffers.toString()}
            icon={BriefCaseIcon}
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
