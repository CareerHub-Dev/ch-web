import SocialInfoBlock from './SocialInfoBlock';
import FollowButton from './FollowButton';
import classes from './CompanySocials.module.scss';

const CompanySocials: React.FC<{ companyId: string }> = ({ companyId }) => {
  const followHandler = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className={classes.social}>
      <div className={classes.blocks}>
        <SocialInfoBlock title="Підписники" value="..." />
        <SocialInfoBlock title="Вакансії" value="..." />
      </div>
      <FollowButton isFollowed={false} onClick={followHandler} />
    </div>
  );
};
export default CompanySocials;
