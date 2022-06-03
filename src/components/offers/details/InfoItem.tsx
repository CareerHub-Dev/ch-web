import classes from './InfoItem.module.scss';

const InfoItem: React.FC<{
  icon: () => JSX.Element;
}> = ({ icon, children }) => {
  const Icon = icon;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{children}</span>
    </li>
  );
};

export default InfoItem;
