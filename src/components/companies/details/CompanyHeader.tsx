import CompanyBanner from './CompanyBanner';
import CompanyInfo from './CompanyInfo';
import CompanyLogo from './CompanyLogo';
import CompanySocials from './CompanySocials';
import TabHeader from './TabHeader';
import classes from './CompanyHeader.module.scss';

const CompanyHeader: React.FC<{
  id: string;
  name: string;
  motto: string;
  companyLogo: string | null | undefined;
  companyBanner: string | null | undefined;
  currentSection?: string | string[];
  changeSection: (section: string) => void;
}> = ({
  id,
  name,
  motto,
  companyLogo,
  companyBanner,
  changeSection,
  currentSection,
}) => {
  return (
    <>
      <CompanyBanner imageId={companyBanner} />
      <div className="flex justify-around">
        <div className={classes.header}>
          <CompanyLogo imageId={companyLogo} />
          <CompanyInfo companyId={id} name={name} motto={motto} />
          <CompanySocials companyId={id} />
        </div>
      </div>
      <div className="flex justify-center">
        <div className={classes.tabs}>
          <TabHeader
            label="Про компанію"
            tabId="about"
            currentTab={currentSection}
            onClick={changeSection}
          />
          <TabHeader
            tabId="offers"
            label="Вакансії"
            currentTab={currentSection}
            onClick={changeSection}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyHeader;
