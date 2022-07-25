import classes from './CompanyBody.module.scss';

const CompanyBody: React.FC<{
  description: string;
}> = ({ description }) => {
  return (
    <div id="companyBodyWraper" className={classes.wapper}>
      <div id="companyBodyContent" className={classes.body}>
        {description}
      </div>
    </div>
  );
};
export default CompanyBody;
