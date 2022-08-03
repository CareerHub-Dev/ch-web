import CompanyBanner from './CompanyBanner';
import CompanyInfo from './CompanyInfo';
import CompanyLogo from './CompanyLogo';
import CompanySocials from './CompanySocials';
import TabHeader from './TabHeader';
import classes from './CompanyHeader.module.scss';

const CompanyHeader: React.FC<{
  id: string;
  name: string;
  moto?: string;
  isFollowed: boolean;
  companyLogo: string;
  companyBanner: string;
}> = ({ id, name, moto, companyLogo, companyBanner, isFollowed }) => {
  const currentTab = 'INFO';

  const tabSwitchHandler = (tabId: string) => {
    //
  };

  return (
    <>
      <CompanyBanner imageId={companyBanner} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <div className={classes.header}>
          <CompanyLogo imageId={companyLogo} />
          <CompanyInfo companyId={id} name={name} moto={moto} />
          <CompanySocials companyId={id} />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={classes.tabs}>
          <TabHeader
            label="Про компанію"
            tabId="INFO"
            currentTab={currentTab}
            onClick={tabSwitchHandler}
          />
          <TabHeader
            tabId="OFFERS"
            label="Вакансії"
            currentTab={currentTab}
            onClick={tabSwitchHandler}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyHeader;
