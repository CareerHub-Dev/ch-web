import classes from './SocialInfoBlock.module.scss';

const SocialInfoBlock: React.FC<{
  value: string;
  title: string;
}> = ({ value, title }) => {
  return (
    <div className={classes.block}>
      <p>{value}</p>
      <label>{title}</label>
    </div>
  );
};
export default SocialInfoBlock;
