import CompanyInfo from './CompanyInfo';
import CompanyLogo from './CompanyLogo';
import CompanyStats from './CompanyStats';

const CompanyHeader: React.FC<{
  id: string;
  name: string;
  motto: string;
  companyLogo: string | null | undefined;
}> = ({ id, name, motto, companyLogo }) => {
  return (
    <div className="flex w-full justify-center">
      <CompanyLogo imageId={companyLogo} />
      <CompanyInfo companyId={id} name={name} motto={motto} />
      <CompanyStats companyId={id} />
    </div>
  );
};

export default CompanyHeader;
