import classes from './CompanyBody.module.scss';

const CompanyBody: React.FC<{
  description: string;
  currentSection: string;
}> = ({ description, currentSection }) => {
  if (currentSection === 'about') {
    return (
      <div id="companyBodyWraper" className={classes.wapper}>
        <div id="companyBodyContent" className={classes.body}>
          {description}
        </div>
      </div>
    );
  }
  if (currentSection === 'offers') {
    return (
      <div id="companyBodyWraper" className={classes.wapper}>
        <div id="companyBodyContent" className={classes.body}>
          <p>
            Скоро в даному розділі ви зможете побачити всі вакансії компанії.
          </p>
        </div>
      </div>
    );
  }
  return null;
};
export default CompanyBody;
