import classes from './CompanyInfo.module.scss';
import CompanyLinks from './CompanyLinks';

const CompanyInfo: React.FC<{
  companyId: string;
  name: string;
  motto?: string;
}> = ({ companyId, name, motto }) => {
  return (
    <div className={classes.info}>
      <h1 className={classes.title}>{name}</h1>
      {!!motto && <h2 className={classes.moto}>{`"${motto}"`}</h2>}
      <CompanyLinks companyId={companyId} />
    </div>
  );
};
export default CompanyInfo;
