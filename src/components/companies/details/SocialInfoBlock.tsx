import classes from './SocialInfoBlock.module.scss';

const defaultStyle = {
  color: `#c20a0a`,
  background: `#ffc8c8`,
};

const SocialInfoBlock: React.FC<{
  value: string;
  title: string;
}> = ({ value, title }) => {
  return (
    <div
      style={{
        background: defaultStyle.background,
      }}
      className={classes.block}
    >
      <p>{value}</p>
      <label style={{ color: defaultStyle.color }}>{title}</label>
    </div>
  );
};
export default SocialInfoBlock;
