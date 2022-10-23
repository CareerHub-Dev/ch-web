import classes from './InfoItem.module.scss';

const InfoItem: React.FC<{
  text: string;
  icon: () => JSX.Element;
}> = ({ text, icon }) => {
  return (
    <div className={classes.item}>
      {icon()}
      <p className="text-md text-darkGray">{text}</p>
    </div>
  );
};
export default InfoItem;
