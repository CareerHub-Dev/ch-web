import classes from './InfoItem.module.scss';

const InfoItem: React.FC<{
  text: string;
  icon: () => JSX.Element;
}> = ({ text, icon }) => {
  const Icon = icon;
  return (
    <div className={classes.item}>
      <Icon />
      <p className="text-md text-darkerGrey">{text}</p>
    </div>
  );
};
export default InfoItem;
