import classes from './CompanySocials.module.scss';
import SocialInfoBlock from './SocialInfoBlock';

const CompanySocials: React.FC<{ companyId: string }> = ({ companyId }) => {
  return (
    <div className={classes.social}>
      <div className={classes.blocks}>
        <SocialInfoBlock title="Підпищики" value="..." />
        <SocialInfoBlock title="Вакансії" value="..." />
      </div>
      <button>Підписатися</button>
    </div>
  );
};
export default CompanySocials;
