import classes from './InfoItem.module.scss';

const InfoItem = ({
  text,
  icon,
}: {
  text: string;
  icon: () => JSX.Element;
}) => {
  return (
    <div className={classes.item}>
      {icon()}
      <p className="text-md text-darkGray">{text}</p>
    </div>
  );
};
export default InfoItem;
