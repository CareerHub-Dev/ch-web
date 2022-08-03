import classes from './CompanyInfo.module.scss';
import CompanyLinks from './CompanyLinks';

const CompanyInfo: React.FC<{
  companyId: string;
  name: string;
  moto?: string;
}> = ({ companyId, name, moto }) => {
  return (
    <div className={classes.info}>
      <h1 className={classes.title}>{name}</h1>
      {moto && <h2 className={classes.moto}>{`"${moto}"`}</h2>}
      <CompanyLinks companyId={companyId} />
    </div>
  );
};
export default CompanyInfo;
