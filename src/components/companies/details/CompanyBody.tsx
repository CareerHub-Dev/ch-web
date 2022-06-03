import classes from './CompanyBody.module.scss';

const CompanyBody = () => {
  return (
    <div id="companyBodyWraper" className={classes['body-wrapper']}>
      <div id="companyBodyContent" className={classes.body}>
        {'contents'}
      </div>
    </div>
  );
};
export default CompanyBody;
