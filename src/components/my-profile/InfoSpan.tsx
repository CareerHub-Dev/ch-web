import classes from './InfoSpan.module.scss';

const InfoSpan: React.FC<{
  text: string;
  icon: () => JSX.Element;
}> = ({ text, icon }) => {
  const Icon = icon;
  return (
    <span className={classes.info}>
      <Icon />
      <span>{text}</span>
    </span>
  );
};
export default InfoSpan;
