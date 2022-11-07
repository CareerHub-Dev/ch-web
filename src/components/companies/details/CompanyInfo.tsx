import CompanyLinks from './CompanyLinks';

const CompanyInfo = ({
  companyId,
  name,
  motto,
}: {
  companyId: string;
  name: string;
  motto?: string;
}) => {
  return (
    <div className="grow pl-4">
      <h2 className="text-3xl font-semibold leading-relaxed">{name}</h2>
      {!!motto && <p className="italic tracking-wide">{`"${motto}"`}</p>}
      <CompanyLinks companyId={companyId} />
    </div>
  );
};
export default CompanyInfo;
