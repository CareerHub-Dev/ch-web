import CompanyInfo from './CompanyInfo';
import CompanyLogo from './CompanyLogo';
import CompanyStats from './CompanyStats';

const CompanyHeader = ({
  id,
  name,
  motto,
  companyLogo,
}: {
  id: string;
  name: string;
  motto: string;
  companyLogo: string | null | undefined;
}) => {
  return (
    <div className="flex w-full justify-center">
      <CompanyLogo imageId={companyLogo} />
      <CompanyInfo companyId={id} name={name} motto={motto} />
      <CompanyStats companyId={id} />
    </div>
  );
};

export default CompanyHeader;
