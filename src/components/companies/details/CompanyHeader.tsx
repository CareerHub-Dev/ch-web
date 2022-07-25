import CompanyBanner from './CompanyBanner';
import CompanyInfo from './CompanyInfo';
import CompanyLogo from './CompanyLogo';
import CompanySocials from './CompanySocials';
import classes from './CompanyHeader.module.scss';

const CompanyHeader: React.FC<{
  id: string;
  name: string;
  moto?: string;
  links: Array<{ title: string; url: string }>;
  isFollowed: boolean;
}> = ({ id, name, moto, links, isFollowed }) => {
  return (
    <div className={classes.header}>
      <CompanyBanner companyId={id} />
      <div>
        <div className={classes.header}>
          <CompanyLogo companyId={id} />
          <CompanyInfo name={name} moto={moto} links={links} />
          <CompanySocials companyId={id} />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CompanyHeader;
